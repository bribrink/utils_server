module.exports = function(filepath, uuid){
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/mediaconvert/command/CreateJobCommand/
  return {
    "Settings": {
      "Inputs": [
        {
          "TimecodeSource": "ZEROBASED",
          "VideoSelector": {},
          "AudioSelectors": {
            "Audio Selector 1": {
              "DefaultSelection": "DEFAULT"
            }
          },
          "FileInput": `s3://parentcritic-tmp/${filepath}`
        }
      ],
      "OutputGroups": [
        {
          "Name": "DASH ISO",
          //"CustomName":uuid,
          "OutputGroupSettings": {
            "Type": "DASH_ISO_GROUP_SETTINGS",
            "DashIsoGroupSettings": {
              "SegmentLength": 30,
              "FragmentLength": 2,
              "Destination": `s3://parentcritic-1//${uuid}/`,
              "DestinationSettings": {
                "S3Settings": {
                  "AccessControl": {
                    "CannedAcl": "PUBLIC_READ"
                  }
                }
              }
            }
          },
          "Outputs": [
            {
              "VideoDescription": {
                "CodecSettings": {
                  "Codec": "H_264",
                  "H264Settings": {
                    "RateControlMode": "QVBR",
                    "SceneChangeDetect": "TRANSITION_DETECTION",
                    "MaxBitrate": 10000000
                  }
                },
                "VideoPreprocessors": {
                  "ColorCorrector": {
                    "Saturation": 55
                  }
                }
              },
              "ContainerSettings": {
                "Container": "MPD"
              },
              "NameModifier": "_output1",
              //"Name": `${uuid}`,
            },
            {
              "AudioDescriptions": [
                {
                  "CodecSettings": {
                    "Codec": "AAC",
                    "AacSettings": {
                      "Bitrate": 96000,
                      "CodingMode": "CODING_MODE_2_0",
                      "SampleRate": 48000
                    }
                  },
                  "AudioSourceName": "Audio Selector 1"
                }
              ],
              "ContainerSettings": {
                "Container": "MPD"
              },
              "NameModifier": "_output2"
            }
          ]
        },
        {
          "Name": "File Group",
          "OutputGroupSettings": {
            "Type": "FILE_GROUP_SETTINGS",
            "FileGroupSettings": {
              "Destination": `s3://parentcritic-1//${uuid}/`,
              "DestinationSettings": {
                "S3Settings": {
                  "AccessControl": {
                    "CannedAcl": "PUBLIC_READ"
                  }
                }
              }
            }
          },
          "Outputs": [
            {
              "VideoDescription": {
                "CodecSettings": {
                  "Codec": "FRAME_CAPTURE",
                  "FrameCaptureSettings": {
                    "FramerateNumerator": 1,
                    "FramerateDenominator": 3
                  }
                },
                "ScalingBehavior": "DEFAULT",
                "Height": 350
              },
              "ContainerSettings": {
                "Container": "RAW"
              }
            }
          ]
        }
      ],
      "TimecodeConfig": {
        "Source": "ZEROBASED"
      },
      "FollowSource": 1
    },
    "Role": "arn:aws:iam::752438713513:role/service-role/MediaConvert_Default_Role",
    "StatusUpdateInterval": "SECONDS_15",
    "Tags":{
      "useruuid":"fff"
    }
  }
}//Click on 'View S3 bucket configurations' link
//arn:aws:sts::752438713513:assumed-role/mediaConvert-role-7bfukcb3/mediaConvert needs permission