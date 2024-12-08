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

@Service
public class WikidataService {
    private final String WIKIDATA_COMMON_URL = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";
    private final String WIKIDATA_COMMON_URL_END = "&width=300";
    private final String WIKIDATA_URL = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=";



    public List<String> searchWikiImages(String text) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        WikidataResponse wikiDataSearchResponse = restTemplate.getForObject(WIKIDATA_URL + text, WikidataResponse.class);
        List<String> imageUrls = new ArrayList<>();
        HashMap<String, Integer> mostValidImageUrls = new HashMap<>();
        for (WikidataResponse.SearchItem searchItem : wikiDataSearchResponse.getSearch()) {
            if (searchItem.getConcepturi() != null) {
                imageUrls.add(searchItem.getConcepturi());
            }
        }
        if (imageUrls.size() < 4) {
            return imageUrls;
        }

        mostValidImageUrls.put(imageUrls.getFirst(), 0);
        List<Integer> qNumbers = new ArrayList<>();

        for (String url : imageUrls) {
            qNumbers.add(extractQNumber(url));
        }

        List<Integer> sortedQNumbers = qNumbers.stream().sorted().toList();
        List<Integer> indexes = new ArrayList<>();

        for (int i = 0; i < qNumbers.size(); i++) {
            indexes.add(qNumbers.indexOf(sortedQNumbers.get(i)));
        }

        List<String> sortedUrls = new ArrayList<>();
        for (int index : indexes) {
            sortedUrls.add(imageUrls.get(index));
        }





        mostValidImageUrls.put(sortedUrls.get(0), 0);
        mostValidImageUrls.put(sortedUrls.get(1), 0);
        mostValidImageUrls.put(sortedUrls.get(2), 0);

        int counter = 2;
        while (mostValidImageUrls.size() < 3) {
            mostValidImageUrls.put(sortedUrls.get(counter), 0);
            counter++;
        }


        List<String> finalUrls = new ArrayList<>();


        for (String entityUrl : mostValidImageUrls.keySet().stream().toList()) {
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

            // take pictures
            if (jsonResponse.has("claims") &&
                    jsonResponse.getJSONObject("claims").has("P18")) {
                JSONArray claims = jsonResponse.getJSONObject("claims").getJSONArray("P18");

                for (int i = 0; i < 1; i++) {
                    String imageName = claims.getJSONObject(i).getJSONObject("mainsnak").getJSONObject("datavalue").getString("value");

                    // Create URL for getting image commons-wikidata
                    String imageUrl = WIKIDATA_COMMON_URL +
                            imageName.replace(" ", "_"); //+
                            //WIKIDATA_COMMON_URL_END;
                    finalUrls.add(imageUrl);
                }
            }
        }





        return finalUrls;
    }




    private int extractQNumber(String uri) {
        String qNumberStr = uri.split("Q")[1];
        return Integer.parseInt(qNumberStr);
    }
}
