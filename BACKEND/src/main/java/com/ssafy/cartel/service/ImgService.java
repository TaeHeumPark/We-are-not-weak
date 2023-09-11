package com.ssafy.cartel.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
public class ImgService {
    @Autowired
    private AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
    public String upload(MultipartFile multipartFile) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile);
    }
    private String upload(File uploadFile) {
        String fileName = uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    private String putS3(File uploadFile, String fileName) {
        s3Client.putObject(
                new PutObjectRequest(bucketName, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
        );
        return s3Client.getUrl(bucketName, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws  IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

//    public String uploadFile(MultipartFile multipartFile) throws IOException {
////        File fileObj = convertMultiPartFileToFile(file);
////        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
////        s3Client.putObject(new PutObjectRequest(bucketName, filename, fileObj));
////        return "File uploaded : " + filename;
//        // S3에 저장되는 파일의 이름이 중복되지 않기 위해서
//        // UUID로 생성한 랜덤 값과 파일 이름을 연결하여 S3에 업로드 하겠습니다.
//        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
//
//        // 그리고 Spring server 에서 S3로 파일을 업로드해야 하는데
//        // 이 때 파일의 사이즈를 ContentLength 로 S3에 알려주기 위해서 ObjectMetadata 를 사용합니다.
//        ObjectMetadata objMeta = new ObjectMetadata();
//        // 주소로 접근 했을때 이미지 보여줌
//        objMeta.setContentType(multipartFile.getContentType());
//        // 주소로 접근 했을때 다운로드됨
//        // objMeta.setContentLength(multipartFile.getInputStream().available());
//
//        // 그리고 이제 S3 API 메소드인 putObject를 이용하여 파일 Stream을 열어서 S3에 파일을 업로드 합니다.
//        s3Client.putObject(bucketName, s3FileName, multipartFile.getInputStream(), objMeta);
//        // 이미지 볼 수 있는 url 준다.
//
//        return s3Client.getUrl(bucketName, s3FileName).toString();
//    }

//    public byte[] downloadFile(String fileName) {
//        S3Object s3Object = s3Client.getObject(bucketName, fileName);
//        S3ObjectInputStream inputStream = s3Object.getObjectContent();
//        try {
//            byte[] content = IOUtils.toByteArray(inputStream);
//            return content;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//    public String deleteFile(String fileName) {
//        s3Client.deleteObject(bucketName, fileName);
//        return fileName + " removed ...";
//    }
//
//    private File convertMultiPartFileToFile(MultipartFile file) {
//        File convertedFile = new File(file.getOriginalFilename());
//        try(FileOutputStream fos = new FileOutputStream(convertedFile)) {
//            fos.write(file.getBytes());
//        } catch (IOException e) {
//            log.error("Error converting multipartFile to file", e);
//        }
//        return convertedFile;
//    }

//    public void s3PutOjectFromStreamCompliant(AmazonS3 s3Client, File inputFile) throws FileNotFoundException {
//        String s3Bucket = "sample-bucket";
//        FileInputStream inputStream = null;
//        try {
//            inputStream = new FileInputStream(inputFile);
//            ObjectMetadata metadata = new ObjectMetadata();
//            // Compliant: specifies the content length of the stream.
//            metadata.setContentLength(inputFile.length());
//            s3Client.putObject(s3Bucket, inputFile.getName(), inputStream, metadata);
//        } finally {
//            IOUtils.closeQuietly(inputStream, null);
//        }
//    }
}
