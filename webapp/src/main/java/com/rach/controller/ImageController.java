package com.rach.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Created by rachaelturner on 11/04/2017.
 */

@RestController
@RequestMapping(value = RestEndpoints.IMAGE_ENDPOINT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class ImageController {
    @RequestMapping(method = RequestMethod.GET)
    public JsonNode GetImages(){
        File imagesFolder = new File("src/main/webapp/Images".replace("/", System.getProperty("file.separator")));
        String[] images = imagesFolder.list();
        ArrayNode payload = new ArrayNode(JsonNodeFactory.instance);
        for(String image: images){
            payload.add(image);
        }

        return payload;
    }


    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void imageUpload(@RequestParam("myFileUpload") MultipartFile file) throws IOException {
        if(!file.isEmpty()){
            Path path = Paths.get("src/main/webapp/Images/" + file.getOriginalFilename());
            Files.copy(file.getInputStream(), path.toAbsolutePath(), StandardCopyOption.REPLACE_EXISTING);

        }
    }

}
