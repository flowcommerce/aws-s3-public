#!/usr/bin/env ruby

# Finds all iso2 character country code files, and copies them to
# their iso3 equivalents.

require 'json'

reference = '../../../../reference/data/countries.json'
if !File.exists?(reference)
  puts "ERROR: Could not find reference file at #{reference}"
  exit(1)
end

countries = {}
JSON.parse(IO.read(reference).strip).each do |c|
  countries[c['iso_3166_2'].downcase] = c['iso_3166_3'].downcase
end

`find . -type f -name "*.png"`.strip.split("\n").each do |p|
  name, ext = File.basename(p).split(".")
  if iso3 = countries.delete(name)
    dir = File.dirname(p)
    target = File.join(dir, "#{iso3}.#{ext}")
    cmd = "cp #{p} #{target}"
    puts cmd
    if !system(cmd)
      puts "Command[%s] failed" %cmd
    end
  end
end

if countries.size > 0
  puts "MISSING FLAGS FOR:"
  countries.keys.sort.each do |c|
    puts " - #{c}"
  end
end
