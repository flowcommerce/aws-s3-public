# aws-s3-public

This repository maps to the AWS bucket named io.flow.aws-s3-public -
providing versioning over the assets available in s3.

# Install the aws cli

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

    aws configure

# Upload files

    go run sync.go

or to sync a single folder:

    go run sync.go www

# View files online

    https://cdn.flow.io/util/environment-provider/environment-provider.jar

    https://cdn.flow.io/docs/implementation/overview.png

# Delete old versions of files in this repo

```
    ~/code/flowcommerce/misc/scripts/delete-all-but-last-n.rb
```
