# aws-s3-public

This repository maps to the AWS bucket named io.flow.aws-s3-public -
providing versioning over the assets available in s3.

# Install the aws cli

http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-with-pip

    curl https://bootstrap.pypa.io/get-pip.py  > get-pip.py
    sudo -H python get-pip.py
    sudo -H pip install --ignore-installed awscli

    aws configure

# Upload files

    go run sync.go

# View files online


    https://cdn.flow.io/util/environment-provider/environment-provider.jar

    https://cdn.flow.io/docs/implementation/overview.png
