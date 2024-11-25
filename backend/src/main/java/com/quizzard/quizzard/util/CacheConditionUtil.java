package com.quizzard.quizzard.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component("cacheConditionUtil")
public class CacheConditionUtil {

    public boolean isNoCache() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs == null) {
            return false;
        }
        HttpServletRequest request = attrs.getRequest();
        String noCacheHeader = request.getHeader("Cache-Control");
        return noCacheHeader != null && noCacheHeader.contains("no-cache");
    }
} 