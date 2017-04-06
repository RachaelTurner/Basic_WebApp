package com.rach.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by rachaelturner on 06/04/2017.
 */

@RestController
@RequestMapping(value = "/")
public class MainController {

    public MainController() {

    }

    @RequestMapping(method= RequestMethod.GET)
    public ModelAndView defaultPage(){
        return new ModelAndView("redirect:/index.html");
    }
}
