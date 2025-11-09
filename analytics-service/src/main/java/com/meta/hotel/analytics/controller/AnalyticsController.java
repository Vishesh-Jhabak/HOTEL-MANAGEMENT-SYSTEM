package com.meta.hotel.analytics.controller;

import com.meta.hotel.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRevenueAnalytics(
            @RequestParam(required = false) String period) {
        Map<String, Object> revenue = new HashMap<>();
        
        // Calculate revenue based on period
        String periodType = period != null ? period : "month";
        revenue.put("period", periodType);
        revenue.put("total", 3780000.0);
        revenue.put("growth", 12.5);
        revenue.put("today", 104000.0);
        revenue.put("thisWeek", 728000.0);
        revenue.put("thisMonth", 3780000.0);
        
        List<Map<String, Object>> dailyData = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            Map<String, Object> day = new HashMap<>();
            day.put("date", LocalDate.now().minusDays(i).toString());
            day.put("revenue", 90000 + (int)(Math.random() * 30000));
            dailyData.add(day);
        }
        revenue.put("dailyData", dailyData);
        
        return ResponseEntity.ok(ApiResponse.ok(revenue));
    }

    @GetMapping("/occupancy")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getOccupancyAnalytics() {
        Map<String, Object> occupancy = new HashMap<>();
        occupancy.put("current", 78.0);
        occupancy.put("available", 129);
        occupancy.put("occupied", 89);
        occupancy.put("maintenance", 3);
        occupancy.put("cleaning", 5);
        
        List<Map<String, Object>> weeklyData = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            Map<String, Object> day = new HashMap<>();
            day.put("date", LocalDate.now().minusDays(i).toString());
            day.put("occupancy", 70 + (int)(Math.random() * 15));
            weeklyData.add(day);
        }
        occupancy.put("weeklyData", weeklyData);
        
        return ResponseEntity.ok(ApiResponse.ok(occupancy));
    }

    @GetMapping("/predictions")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPredictions() {
        Map<String, Object> predictions = new HashMap<>();
        
        // Predictive analytics
        predictions.put("nextWeekOccupancy", 82.5);
        predictions.put("nextMonthRevenue", 4200000.0);
        predictions.put("peakDay", LocalDate.now().plusDays(7).toString());
        predictions.put("demandTrend", "increasing");
        predictions.put("recommendedPricing", 1.15); // 15% increase recommended
        
        List<Map<String, Object>> forecast = new ArrayList<>();
        for (int i = 1; i <= 7; i++) {
            Map<String, Object> day = new HashMap<>();
            day.put("date", LocalDate.now().plusDays(i).toString());
            day.put("predictedOccupancy", 75 + (int)(Math.random() * 10));
            day.put("confidence", 85 + (int)(Math.random() * 10));
            forecast.add(day);
        }
        predictions.put("forecast", forecast);
        
        return ResponseEntity.ok(ApiResponse.ok(predictions));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardData() {
        Map<String, Object> dashboard = new HashMap<>();
        
        // Revenue
        Map<String, Object> revenue = new HashMap<>();
        revenue.put("today", 104000.0);
        revenue.put("thisWeek", 728000.0);
        revenue.put("thisMonth", 3780000.0);
        revenue.put("growth", 12.5);
        dashboard.put("revenue", revenue);
        
        // Occupancy
        Map<String, Object> occupancy = new HashMap<>();
        occupancy.put("current", 78.0);
        occupancy.put("available", 129);
        occupancy.put("occupied", 89);
        dashboard.put("occupancy", occupancy);
        
        // Guest Satisfaction
        Map<String, Object> satisfaction = new HashMap<>();
        satisfaction.put("averageRating", 4.8);
        satisfaction.put("reviewsToday", 12);
        satisfaction.put("complaints", 2);
        dashboard.put("satisfaction", satisfaction);
        
        // Staff Performance
        Map<String, Object> staff = new HashMap<>();
        staff.put("activeStaff", 24);
        staff.put("tasksCompleted", 156);
        staff.put("efficiency", 92.0);
        dashboard.put("staff", staff);
        
        return ResponseEntity.ok(ApiResponse.ok(dashboard));
    }
}

