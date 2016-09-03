#!/usr/bin/env ruby

# Usage:
#
#   ./extract-test-data.rb metricdb --host localhost --user api --port 5432 --table organization.organizations --table catalog.catalogs
#
# If you do not specify a table, the default list for the given database name will be used.
#
# At Flow, ssh to dbgateway
#
# rm -f extract-test-data.rb
# curl --silent http://io.flow.aws-s3-public.s3-website-us-east-1.amazonaws.com/util/scripts/extract-test-data.rb > extract-test-data.rb
# chmod +x extract-test-data.rb
# ./extract-test-data.rb metricdb
#
# You will now have a file named metricdb.tar.gz in your working
# directory. This file contains the data from the production metricdb
# for the default tables we export for that database.
#

DEFAULT_TABLES = {
  "currencydb" => %w(public.spot_rates public.contracted_rates public.rates),

  "metricdb" => %w(catalog.catalogs catalog.item_categories catalog.items catalog.subcatalog_items currency.contracted_rates currency.flow_currency_settings currency.organization_currency_settings currency.rates experience.item_margins harmonization.hs6_codes organization.organizations views.catalog_item_documents views.harmonization_documents)
}

class DatabaseConfig

  GLOBAL_DEFAULTS = {
    :host => 'localhost',
    :port => 5432,
    :user => 'api'
  }

  def initialize(name, opts={})
    defaults = DatabaseConfig.read_pgpass[name] || GLOBAL_DEFAULTS
    merged = defaults.merge(opts)

    @name = name
    @user = merged.delete(:user)
    @host = merged.delete(:host)
    @port = merged.delete(:port).to_i
  end

  # Reads pgpass, returning default information based on a database name
  def DatabaseConfig.read_pgpass
    defaults = {}
    path = File.expand_path("~/.pgpass")
    if File.exists?(path)
      IO.readlines(path).each do |line|
        host, port, n, user, rest = line.split(":", 5)
        defaults[n] = {
          :host => host,
          :port => port,
          :user => user
        }
      end
    end
    defaults
  end

  # extract("/tmp", "organization.organizations")
  def extract(dir, table)
    target = File.join(dir, "#{table}.csv")
    run("psql -U %s -h %s --command 'copy %s to STDOUT with csv header' %s > %s" % [@user, @host, table, @name, target])
  end

end

def run(cmd)
  puts "==> %s" % cmd
  if !system(cmd)
    puts "ERROR - last command failed"
    exit(1)
  end
end

name = ARGV.shift.to_s.strip
if name.empty?
  puts "ERROR: name is required"
  exit(1)
end

args = {}
i = 0
while i < ARGV.size
  value = ARGV[i]
  if md = value.match(/^\-\-(.+)/)
    key = md[1].to_sym
    case key
    when :table
      args[key] ||= []
      args[key] << ARGV[i+1]
    else
      args[key] = ARGV[i+1]
    end
    i += 2
  else
    i += 1
  end
end

dir = "/tmp/extract-test-data.%s.tmp" % Process.pid
target = "%s.tar.gz" % name

tables = (args.delete(:table) || [])
if tables.empty?
  tables = DEFAULT_TABLES[name]
  if tables.empty?
    puts "ERROR: Must specify at least one table to extract" % target
    puts "       Either provide 1 or more --table arguments or"
    puts "       Update this script to add '%s' to DEFAULT_TABLES" % name
    exit(1)
  end
end

invalid = tables.select { |t|
  t.split(".").size != 2
}
if !invalid.empty?
  puts "ERROR: Invalid table names. Please make sure table names contain schema.name (e.g. public.users)"
  puts "       Invalid names: #{invalid.join(" ")}"
  exit(1)
end

if File.exists?(target)
  puts "ERROR: Target file[%s] exists. Pls remove before running" % target
  exit(1)
end

begin
  run("mkdir -p #{dir}")
  config = DatabaseConfig.new(name, args)
  tables.each do |table|
    config.extract(dir, table)
  end

  Dir.chdir(dir) do
    run("tar cf %s.tar *csv" % name)
    run("gzip %s.tar" % name)
  end
  run("mv %s/%s.tar.gz ." % [dir, name])

ensure
  run("rm -rf #{dir}")
end

puts "Created %s" % target
