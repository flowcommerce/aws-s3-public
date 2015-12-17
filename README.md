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

    aws s3 sync splashpage-www s3://io.flow.aws-s3-public/splashpage-www

# View files online

Example:

    http://io.flow.aws-s3-public.s3-website-us-east-1.amazonaws.com/splashpage-www/videos/19083883.mp4

    https://s3.amazonaws.com/io.flow.aws-s3-public/splashpage-www/videos/19083883.mp4
    