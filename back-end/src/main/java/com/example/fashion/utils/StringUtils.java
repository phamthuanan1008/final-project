package com.example.fashion.utils;

import java.text.Normalizer;

public class StringUtils {

    public static String removeVietnameseUnicode(String text){
        String textNormalized = Normalizer.normalize(text, Normalizer.Form.NFD);

        return textNormalized.replaceAll("\\p{M}", "");
    }
}
