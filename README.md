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

    aws s3 sync www s3://io.flow.aws-s3-public/www --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
    aws s3 sync docs s3://io.flow.aws-s3-public/docs --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
    aws s3 sync util s3://io.flow.aws-s3-public/util --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
    aws s3 sync email s3://io.flow.aws-s3-public/email --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

# View files online


    https://s3.amazonaws.com/io.flow.aws-s3-public/util/environment-provider/environment-provider.jar

    https://s3.amazonaws.com/io.flow.aws-s3-public/util/similarweb/similarweb

Example URLs:

    http://io.flow.aws-s3-public.s3-website-us-east-1.amazonaws.com/www/videos/19083883.mp4

    http://io.flow.aws-s3-public.s3-website-us-east-1.amazonaws.com/docs/implementation/overview.png

    https://s3.amazonaws.com/io.flow.aws-s3-public/www/videos/19083883.mp4
