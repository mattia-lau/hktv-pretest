package com.example.hktv_pretest.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CsvReader {
    public static List<String> readCsv(InputStream stream) {
        List<String> lines = new ArrayList<>();
        try {
            String line;
            InputStream is = stream;
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            int row = 0;
            while ((line = br.readLine()) != null) {
                if (row++ >= 1) {
                    lines.add(line);
                }
            }
        } catch (IOException e) {

        }
        return lines;
    }
}
