package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.response.WikidataResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WikidataService {
    private final String WIKIDATA_COMMON_URL = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";
    private final String WIKIDATA_URL = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=";

    public List<String> searchWikiImages(String text) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        WikidataResponse wikiDataSearchResponse = restTemplate.getForObject(WIKIDATA_URL + text, WikidataResponse.class);

        // Extract concepturis and sort by Q number
        List<String> sortedConceptUris = wikiDataSearchResponse.getSearch().stream()
                .filter(item -> item.getConcepturi() != null)
                .map(WikidataResponse.SearchItem::getConcepturi)
                .sorted(Comparator.comparingInt(this::extractQNumber))
                .collect(Collectors.toList());

        // Limit to first 3 URLs
        List<String> selectedUrls = sortedConceptUris.stream()
                .limit(2)
                .collect(Collectors.toList());

        List<String> finalUrls = new ArrayList<>();

        for (String entityUrl : selectedUrls) {
            // Extract Q Number from URL
            String qNumber = entityUrl.substring(entityUrl.lastIndexOf("Q"));

            // Create URL for wikidata api call
            String apiUrl = "https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity=" + qNumber + "&format=json";

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

            StringBuilder response = new StringBuilder();
            String output;
            while ((output = br.readLine()) != null) {
                response.append(output);
            }

            conn.disconnect();

            // Process JSON response
            JSONObject jsonResponse = new JSONObject(response.toString());

            // Take pictures
            if (jsonResponse.has("claims") &&
                    jsonResponse.getJSONObject("claims").has("P18")) {
                JSONArray claims = jsonResponse.getJSONObject("claims").getJSONArray("P18");
                if (claims.length() > 1) {
                    for (int i = 0; i < 2; i++) {
                        String imageName = claims.getJSONObject(i).getJSONObject("mainsnak").getJSONObject("datavalue").getString("value");

                        // Create URL for getting image from Wikimedia Commons
                        String imageUrl = WIKIDATA_COMMON_URL + imageName.replace(" ", "_");
                        finalUrls.add(imageUrl);
                    }
                } else if (claims.length() == 1) {
                    String imageName = claims.getJSONObject(0).getJSONObject("mainsnak").getJSONObject("datavalue").getString("value");

                    // Create URL for getting image from Wikimedia Commons
                    String imageUrl = WIKIDATA_COMMON_URL + imageName.replace(" ", "_");
                    finalUrls.add(imageUrl);
                }

            }
        }

        return finalUrls;
    }

    public int extractQNumber(String uri) {
        try {
            String qNumberStr = uri.substring(uri.lastIndexOf("Q") + 1);
            return Integer.parseInt(qNumberStr);
        } catch (NumberFormatException | IndexOutOfBoundsException e) {
            return Integer.MAX_VALUE; // Fallback for invalid Q numbers
        }
    }
}