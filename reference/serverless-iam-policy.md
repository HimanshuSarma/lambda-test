# Serverless Framework IAM Policy

Use the IAM policy (JSON data) for the [Serverless Framework](https://www.serverless.com/) with the AWS Provider for deploying Node.js apps as serverless functions on AWS Lambda.

Replace `AWS_ID` with your AWS Account ID (e.g. `123456789`) which you can find under [AWS IAM](https://console.aws.amazon.com/iam/) in the console.

Use [this gist](https://gist.github.com/codingforentrepreneurs/03f6ddb7ba284e4f82a6c66b3103feda) for the most up-to-date version.

`serverless-framework-iam-policy.json`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ElastiCacheManagementActions",
            "Effect": "Allow",
            "Action": "elasticache:*",
            "Resource": "*"
        },
        {
            "Sid": "CreateServiceLinkedRole",
            "Effect": "Allow",
            "Action": "iam:CreateServiceLinkedRole",
            "Resource": "arn:aws:iam::*:role/aws-service-role/elasticache.amazonaws.com/AWSServiceRoleForElastiCache",
            "Condition": {
                "StringLike": {
                    "iam:AWSServiceName": "elasticache.amazonaws.com"
                }
            }
        },
        {
            "Sid": "CreateVPCEndpoints",
            "Effect": "Allow",
            "Action": "ec2:CreateVpcEndpoint",
            "Resource": "arn:aws:ec2:*:*:vpc-endpoint/*",
            "Condition": {
                "StringLike": {
                    "ec2:VpceServiceName": "com.amazonaws.elasticache.serverless.*"
                }
            }
        },
        {
            "Sid": "AllowAccessToElastiCacheTaggedVpcEndpoints",
            "Effect": "Allow",
            "Action": [
                "ec2:CreateVpcEndpoint"
            ],
            "NotResource": "arn:aws:ec2:*:*:vpc-endpoint/*"
        },
        {
            "Sid": "TagVPCEndpointsOnCreation",
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags"
            ],
            "Resource": "arn:aws:ec2:*:*:vpc-endpoint/*",
            "Condition": {
                "StringEquals": {
                    "ec2:CreateAction": "CreateVpcEndpoint",
                    "aws:RequestTag/AmazonElastiCacheManaged": "true"
                }
            }
        },
        {
            "Sid": "AllowAccessToEc2",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeVpcs",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowAccessToKMS",
            "Effect": "Allow",
            "Action": [
                "kms:DescribeKey",
                "kms:ListAliases",
                "kms:ListKeys"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowAccessToCloudWatch",
            "Effect": "Allow",
            "Action": [
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:GetMetricData"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowAccessToAutoScaling",
            "Effect": "Allow",
            "Action": [
                "application-autoscaling:DescribeScalableTargets",
                "application-autoscaling:DescribeScheduledActions",
                "application-autoscaling:DescribeScalingPolicies",
                "application-autoscaling:DescribeScalingActivities"
            ],
            "Resource": "*"
        },
        {
            "Sid": "DescribeLogGroups",
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogGroups"
            ],
            "Resource": "*"
        },
        {
            "Sid": "ListLogDeliveryStreams",
            "Effect": "Allow",
            "Action": [
                "firehose:ListDeliveryStreams"
            ],
            "Resource": "*"
        },
        {
            "Sid": "DescribeS3Buckets",
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowAccessToOutposts",
            "Effect": "Allow",
            "Action": [
                "outposts:ListOutposts"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowAccessToSNS",
            "Effect": "Allow",
            "Action": [
                "sns:ListTopics"
            ],
            "Resource": "*"
        },
        {
            "Action": [
                "dynamodb:*",
                "dax:*",
                "application-autoscaling:DeleteScalingPolicy",
                "application-autoscaling:DeregisterScalableTarget",
                "application-autoscaling:DescribeScalableTargets",
                "application-autoscaling:DescribeScalingActivities",
                "application-autoscaling:DescribeScalingPolicies",
                "application-autoscaling:PutScalingPolicy",
                "application-autoscaling:RegisterScalableTarget",
                "cloudwatch:DeleteAlarms",
                "cloudwatch:DescribeAlarmHistory",
                "cloudwatch:DescribeAlarms",
                "cloudwatch:DescribeAlarmsForMetric",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:ListMetrics",
                "cloudwatch:PutMetricAlarm",
                "cloudwatch:GetMetricData",
                "datapipeline:ActivatePipeline",
                "datapipeline:CreatePipeline",
                "datapipeline:DeletePipeline",
                "datapipeline:DescribeObjects",
                "datapipeline:DescribePipelines",
                "datapipeline:GetPipelineDefinition",
                "datapipeline:ListPipelines",
                "datapipeline:PutPipelineDefinition",
                "datapipeline:QueryObjects",
                "ec2:DescribeVpcs",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
                "iam:GetRole",
                "iam:ListRoles",
                "kms:DescribeKey",
                "kms:ListAliases",
                "sns:CreateTopic",
                "sns:DeleteTopic",
                "sns:ListSubscriptions",
                "sns:ListSubscriptionsByTopic",
                "sns:ListTopics",
                "sns:Subscribe",
                "sns:Unsubscribe",
                "sns:SetTopicAttributes",
                "lambda:CreateFunction",
                "lambda:ListFunctions",
                "lambda:ListEventSourceMappings",
                "lambda:CreateEventSourceMapping",
                "lambda:DeleteEventSourceMapping",
                "lambda:GetFunctionConfiguration",
                "lambda:DeleteFunction",
                "resource-groups:ListGroups",
                "resource-groups:ListGroupResources",
                "resource-groups:GetGroup",
                "resource-groups:GetGroupQuery",
                "resource-groups:DeleteGroup",
                "resource-groups:CreateGroup",
                "tag:GetResources",
                "kinesis:ListStreams",
                "kinesis:DescribeStream",
                "kinesis:DescribeStreamSummary"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": "cloudwatch:GetInsightRuleReport",
            "Effect": "Allow",
            "Resource": "arn:aws:cloudwatch:*:*:insight-rule/DynamoDBContributorInsights*"
        },
        {
            "Action": [
                "iam:PassRole"
            ],
            "Effect": "Allow",
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "iam:PassedToService": [
                        "application-autoscaling.amazonaws.com",
                        "application-autoscaling.amazonaws.com.cn",
                        "dax.amazonaws.com"
                    ]
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:AWSServiceName": [
                        "replication.dynamodb.amazonaws.com",
                        "dax.amazonaws.com",
                        "dynamodb.application-autoscaling.amazonaws.com",
                        "contributorinsights.dynamodb.amazonaws.com",
                        "kinesisreplication.dynamodb.amazonaws.com"
                    ]
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:List*",
                "cloudformation:Get*",
                "cloudformation:ValidateTemplate",
                "ssm:*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:CreateStack",
                "cloudformation:CreateUploadBucket",
                "cloudformation:DeleteStack",
                "cloudformation:Describe*",
                "cloudformation:UpdateStack",
                "cloudformation:CreateChangeSet",
                "cloudformation:ListChangeSets",
                "cloudformation:DeleteChangeSet",
                "cloudformation:ExecuteChangeSet"
            ],
            "Resource": [
                "arn:aws:cloudformation:*:121958812372:stack/serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:Get*",
                "lambda:List*",
                "lambda:CreateFunction",
                "lambda:TagResource",
                "lambda:UntagResource"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:CreateBucket",
                "s3:DeleteBucket",
                "s3:ListBucket",
                "s3:GetBucketPolicy",
                "s3:PutBucketPolicy",
                "s3:ListBucketVersions",
                "s3:PutAccelerateConfiguration",
                "s3:GetEncryptionConfiguration",
                "s3:PutEncryptionConfiguration",
                "s3:DeleteBucketPolicy",
                "s3:PutBucketTagging",
                "s3:UntagResource",
                "s3:TagResource",
                "s3:GetBucketTagging",
                "s3:ListTagsForResource"
            ],
            "Resource": [
                "arn:aws:s3:::serverless-*serverlessdeploy*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::serverless-*serverlessdeploy*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:AddPermission",
                "lambda:CreateAlias",
                "lambda:DeleteFunction",
                "lambda:InvokeFunction",
                "lambda:PublishVersion",
                "lambda:RemovePermission",
                "lambda:Update*"
            ],
            "Resource": [
                "arn:aws:lambda:*:121958812372:function:serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudwatch:GetMetricStatistics"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DeleteLogGroup",
                "logs:TagResource",
                "logs:UntagResource"
            ],
            "Resource": [
                "arn:aws:logs:*:121958812372:*"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:121958812372:*"
            ],
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups",
                "logs:FilterLogEvents"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "events:Put*",
                "events:Remove*",
                "events:Delete*"
            ],
            "Resource": [
                "arn:aws:events:*:121958812372:rule/serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "events:DescribeRule"
            ],
            "Resource": [
                "arn:aws:events:*:121958812372:rule/serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "arn:aws:iam::121958812372:role/serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:GetRole",
                "iam:CreateRole",
                "iam:TagRole",
                "iam:PutRolePolicy",
                "iam:DeleteRolePolicy",
                "iam:DeleteRole"
            ],
            "Resource": [
                "arn:aws:iam::121958812372:role/serverless-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "apigateway:*"
            ],
            "Resource": [
                "arn:aws:apigateway:*::/apis*",
                "arn:aws:apigateway:*::/restapis*",
                "arn:aws:apigateway:*::/apikeys*",
                "arn:aws:apigateway:*::/tags*",
                "arn:aws:apigateway:*::/usageplans*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "tag:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
