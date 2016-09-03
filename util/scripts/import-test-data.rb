#!/usr/bin/env ruby

# Usage:
#
#   ./import-test-data.rb metricdb.tar.gz --host localhost --user api --port 5432
#
# This will import data from the metricdb tarball into your local metric db
#
# rm -f import-test-data.rb
# curl --silent http://io.flow.aws-s3-public.s3-website-us-east-1.amazonaws.com/util/scripts/import-test-data.rb > import-test-data.rb
# chmod +x import-test-data.rb
# ./import-test-data.rb metricdb.tar.gz
#

class DatabaseConfig

  GLOBAL_DEFAULTS = {
    :host => 'localhost',
    :port => 5432,
    :user => 'api'
  }

  def initialize(name, opts={})
    merged = GLOBAL_DEFAULTS.merge(opts)

    @name = name
    @user = merged.delete(:user)
    @host = merged.delete(:host)
    @port = merged.delete(:port).to_i
  end

  def import(path, schema, table)
    run("psql -U %s -h %s --command \"copy %s.%s from '%s' DELIMITER ',' CSV HEADER\" %s" % [@user, @host, schema, table, path, @name])
  end

end

def run(cmd)
  puts "==> %s" % cmd
  if !system(cmd)
    puts "ERROR - last command failed"
    exit(1)
  end
end

path = ARGV.shift.to_s.strip
if path.empty?
  puts "ERROR: path is required"
  exit(1)
end

if !File.exists?(path)
  puts "ERROR: File not found: %s" % path
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

dir = "/tmp/import-test-data.%s.tmp" % Process.pid
name = File.basename(path).sub(/\..+/, '')

begin
  config = DatabaseConfig.new(name, args)

  run("mkdir -p #{dir}")
  run("cp %s %s" % [path, dir])

  Dir.chdir(dir) do
    run("tar xvfz %s" % File.basename(path))
    Dir.glob("*.csv").each do |csv|
      schema, table, rest = csv.split(".")
      config.import(File.join(dir, csv), schema, table)
    end
  end
  
ensure
  run("rm -rf #{dir}")
end
