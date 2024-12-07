package com.quizzard.quizzard.service;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FileUploadServiceTest {

    @Mock
    private Storage storage;

    @InjectMocks
    private FileUploadService fileUploadService;

    @Mock
    private MultipartFile mockFile;

    private static final String TEST_BUCKET_NAME = "test-bucket";

    @BeforeEach
    public void setUp() {
        // Set the bucket name using reflection since it's a @Value field
        ReflectionTestUtils.setField(fileUploadService, "bucketName", TEST_BUCKET_NAME);
    }

    @Test
    public void testUploadFile_Success() throws IOException {
        // Arrange
        String originalFileName = "test-image.jpg";
        byte[] fileContent = "test file content".getBytes();

        when(mockFile.getOriginalFilename()).thenReturn(originalFileName);
        when(mockFile.getBytes()).thenReturn(fileContent);

        // Act
        String uploadedFileUrl = fileUploadService.uploadFile(mockFile);

        // Assert
        // Capture the arguments passed to storage.create()
        ArgumentCaptor<BlobId> blobIdCaptor = ArgumentCaptor.forClass(BlobId.class);
        ArgumentCaptor<byte[]> bytesCaptor = ArgumentCaptor.forClass(byte[].class);

        verify(storage).create(any(BlobInfo.class), bytesCaptor.capture());

        // Verify file content
        assertArrayEquals(fileContent, bytesCaptor.getValue());

        // Verify URL format
        assertTrue(uploadedFileUrl.startsWith("https://storage.googleapis.com/" + TEST_BUCKET_NAME + "/"));
        assertTrue(uploadedFileUrl.contains(originalFileName));
    }

    @Test
    public void testUploadFile_NullFileName() throws IOException {
        // Arrange
        when(mockFile.getOriginalFilename()).thenReturn(null);
        byte[] fileContent = "test file content".getBytes();
        when(mockFile.getBytes()).thenReturn(fileContent);

        // Act
        String uploadedFileUrl = fileUploadService.uploadFile(mockFile);

        // Assert
        // Verify URL format with generated UUID
        assertTrue(uploadedFileUrl.startsWith("https://storage.googleapis.com/" + TEST_BUCKET_NAME + "/"));
        assertTrue(uploadedFileUrl.contains("null"));
    }

    @Test
    public void testUploadFile_IOExceptionHandling() throws IOException {
        // Arrange
        when(mockFile.getOriginalFilename()).thenReturn("test-image.jpg");
        when(mockFile.getBytes()).thenThrow(new IOException("Test IO Exception"));

        // Act & Assert
        assertThrows(IOException.class, () -> {
            fileUploadService.uploadFile(mockFile);
        });
    }

    @Test
    public void testUploadFile_FileNameGeneration() throws IOException {
        // Arrange
        String originalFileName = "test-image.jpg";
        byte[] fileContent = "test file content".getBytes();

        when(mockFile.getOriginalFilename()).thenReturn(originalFileName);
        when(mockFile.getBytes()).thenReturn(fileContent);

        // Act
        String uploadedFileUrl = fileUploadService.uploadFile(mockFile);

        // Assert
        // Verify that the filename contains a UUID and the original filename
        String[] urlParts = uploadedFileUrl.split("/");
        String generatedFileName = urlParts[urlParts.length - 1];

        assertTrue(generatedFileName.matches("^[0-9a-f-]+-" + originalFileName + "$"));
    }
}
