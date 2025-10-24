import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('AWS 설정 환경 변수가 올바르게 설정되지 않았습니다.');
    }

    this.s3 = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
    this.bucketName = bucketName;
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'images',
  ): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const result = await this.s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류';
      throw new Error(`파일 업로드 실패: ${errorMessage}`);
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder: string = 'images',
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const key = fileUrl.split('.com/')[1];

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류';
      throw new Error(`파일 삭제 실패: ${errorMessage}`);
    }
  }

  async deleteMultipleFiles(fileUrls: string[]): Promise<void> {
    const deletePromises = fileUrls.map((url) => this.deleteFile(url));
    await Promise.all(deletePromises);
  }
}
