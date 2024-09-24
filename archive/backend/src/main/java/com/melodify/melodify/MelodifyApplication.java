package com.melodify.melodify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@AutoConfiguration
@EnableElasticsearchRepositories("com.melodify.melodify.repository.PostSearchRepository")
public class MelodifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MelodifyApplication.class, args);
	}

}
