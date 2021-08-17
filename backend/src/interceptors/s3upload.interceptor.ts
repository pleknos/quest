import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

class S3Storage {
  s3: any;

  init() {
    this.s3 = new S3({
      endpoint: process.env.S3_ENDPOINT,
      // region: process.env.S3_REGION,
      secretAccessKey: process.env.S3_KEY,
      accessKeyId: process.env.S3_ID,
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  href(key) {
    return `${ process.env.S3_URL }${ key }`;
  }

  async put({ originalname, buffer }) {
    if (!this.s3) this.init();

    const splittedName = originalname.split('.');

    const key = uuidv4() + '.' + splittedName[splittedName.length - 1];

    return new Promise((resolve, reject) => {
      this.s3.putObject({
        Key: key,
        Bucket: process.env.S3_BUCKET,
        Body: buffer,
        ACL: 'public-read',
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.href(key));
        }
      });
    });
  }
}

const storage = new S3Storage();


@Injectable()
export class S3UploadInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    for (const arg of context.getArgs()) {
      const file = arg.file;
      const files = arg.files;

      if (file) {
        request.body[arg.name] = await storage.put(file);
      }

      if (files) {
        for (const [fileName, fileContents] of Object.entries(files)) {
          for (const fileContent of fileContents as any[]) {
            request.body[fileName] = await storage.put(fileContent);
          }
        }
      }
    }

    return next.handle();
  }
}
