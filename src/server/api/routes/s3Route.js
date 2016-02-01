import aws from 'aws-sdk'
import uuid from 'node-uuid'
import config from 'ape-config'

const ATTACHMENTS_S3_BUCKET = config.get('ATTACHMENTS_S3_BUCKET', 'assignmentdesk-attachments')

export default function initializeS3Route(server) {

  server.get('/s3/sign', (req, res, next) => {
    const { objectName, contentType } = req.query

    const filename = uuid.v4() + '_' + objectName

    const s3 = new aws.S3()

    const params = {
      Bucket: ATTACHMENTS_S3_BUCKET,
      Key: filename,
      Expires: 60,
      ContentType: contentType,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        res.log.error({ err })
        return next(err)
      }

      res.json({
        signedUrl: data,
        publicUrl: `https://s3.amazonaws.com/${ATTACHMENTS_S3_BUCKET}/${filename}`,
        s3Name: filename,
        filename: objectName,
        contentType
      })
    })

    return next()
  })
}
