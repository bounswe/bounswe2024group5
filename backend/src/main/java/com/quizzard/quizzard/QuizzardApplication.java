package com.quizzard.quizzard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@AutoConfiguration
@EnableElasticsearchRepositories("com.quizzard.quizzard.repository.PostSearchRepository")
public class QuizzardApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizzardApplication.class, args);
	}

}
