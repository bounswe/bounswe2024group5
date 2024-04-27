package com.melodify.melodify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AutoConfiguration
public class MelodifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MelodifyApplication.class, args);
	}

}
