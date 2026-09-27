package com.triptales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({
            "/",
            "/trips",
            "/create-trip",
            "/memorygram",
            "/journal",
            "/timeline",
            "/trip/{id}"
    })
    public String forwardToFrontend() {
        return "forward:/index.html";
    }
}