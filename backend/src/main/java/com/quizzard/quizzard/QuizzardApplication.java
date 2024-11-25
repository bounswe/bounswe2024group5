package com.quizzard.quizzard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
@AutoConfiguration
public class QuizzardApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizzardApplication.class, args);
	}

}
