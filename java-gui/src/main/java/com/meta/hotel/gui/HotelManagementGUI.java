package com.meta.hotel.gui;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class HotelManagementGUI extends JFrame {
    private JTabbedPane tabbedPane;
    private DefaultTableModel checkInTableModel;
    private DefaultTableModel checkOutTableModel;
    private DefaultTableModel revenueTableModel;
    private DefaultTableModel suppliesTableModel;
    private DefaultTableModel cleaningStatusTableModel;
    private DefaultTableModel roomBookingTableModel;

    public HotelManagementGUI() {
        initializeGUI();
        loadSampleData();
    }

    private void initializeGUI() {
        setTitle("JAVA HOTEL MANAGEMENT SYSTEM - Java GUI");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1200, 800);
        setLocationRelativeTo(null);

        // Create tabbed pane
        tabbedPane = new JTabbedPane();
        
        // Create tabs for different roles
        createAdminTab();
        createManagerTab();
        createReceptionTab();
        createHousekeepingTab();
        createGuestTab();

        add(tabbedPane);
    }

    private void createAdminTab() {
        JPanel adminPanel = new JPanel(new BorderLayout());
        
        // Revenue tracking table
        String[] revenueColumns = {"Date", "Room Type", "Revenue (₹)", "Occupancy %", "Status"};
        revenueTableModel = new DefaultTableModel(revenueColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable revenueTable = new JTable(revenueTableModel);
        revenueTable.setRowHeight(25);
        
        JScrollPane revenueScrollPane = new JScrollPane(revenueTable);
        revenueScrollPane.setPreferredSize(new Dimension(800, 300));
        
        JLabel revenueLabel = new JLabel("Revenue Tracking - Admin View", SwingConstants.CENTER);
        revenueLabel.setFont(new Font("Arial", Font.BOLD, 16));
        
        adminPanel.add(revenueLabel, BorderLayout.NORTH);
        adminPanel.add(revenueScrollPane, BorderLayout.CENTER);
        
        // Add refresh button
        JButton refreshRevenueBtn = new JButton("Refresh Revenue Data");
        refreshRevenueBtn.addActionListener(e -> refreshRevenueData());
        adminPanel.add(refreshRevenueBtn, BorderLayout.SOUTH);
        
        tabbedPane.addTab("Admin Dashboard", adminPanel);
    }

    private void createManagerTab() {
        JPanel managerPanel = new JPanel(new BorderLayout());
        
        // Check-in list table
        String[] checkInColumns = {"Guest Name", "Room Number", "Check-in Time", "Duration", "Total Amount (₹)", "Status"};
        checkInTableModel = new DefaultTableModel(checkInColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable checkInTable = new JTable(checkInTableModel);
        checkInTable.setRowHeight(25);
        
        JScrollPane checkInScrollPane = new JScrollPane(checkInTable);
        checkInScrollPane.setPreferredSize(new Dimension(800, 200));
        
        // Revenue summary for manager
        String[] revenueColumns = {"Period", "Total Revenue (₹)", "Room Revenue (₹)", "Service Revenue (₹)", "Growth %"};
        revenueTableModel = new DefaultTableModel(revenueColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable revenueTable = new JTable(revenueTableModel);
        revenueTable.setRowHeight(25);
        
        JScrollPane revenueScrollPane = new JScrollPane(revenueTable);
        revenueScrollPane.setPreferredSize(new Dimension(800, 200));
        
        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel checkInLabel = new JLabel("Check-in List - Manager View", SwingConstants.CENTER);
        checkInLabel.setFont(new Font("Arial", Font.BOLD, 14));
        topPanel.add(checkInLabel, BorderLayout.NORTH);
        topPanel.add(checkInScrollPane, BorderLayout.CENTER);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        JLabel revenueLabel = new JLabel("Revenue Summary - Manager View", SwingConstants.CENTER);
        revenueLabel.setFont(new Font("Arial", Font.BOLD, 14));
        bottomPanel.add(revenueLabel, BorderLayout.NORTH);
        bottomPanel.add(revenueScrollPane, BorderLayout.CENTER);
        
        managerPanel.add(topPanel, BorderLayout.NORTH);
        managerPanel.add(bottomPanel, BorderLayout.CENTER);
        
        // Add refresh button
        JButton refreshManagerBtn = new JButton("Refresh Manager Data");
        refreshManagerBtn.addActionListener(e -> refreshManagerData());
        managerPanel.add(refreshManagerBtn, BorderLayout.SOUTH);
        
        tabbedPane.addTab("Manager Dashboard", managerPanel);
    }

    private void createReceptionTab() {
        JPanel receptionPanel = new JPanel(new BorderLayout());
        
        // Check-in table
        String[] checkInColumns = {"Guest Name", "Room Number", "Check-in Time", "Phone", "Status"};
        checkInTableModel = new DefaultTableModel(checkInColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable checkInTable = new JTable(checkInTableModel);
        checkInTable.setRowHeight(25);
        
        // Check-out table
        String[] checkOutColumns = {"Guest Name", "Room Number", "Check-out Time", "Bill Amount (₹)", "Payment Status"};
        checkOutTableModel = new DefaultTableModel(checkOutColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable checkOutTable = new JTable(checkOutTableModel);
        checkOutTable.setRowHeight(25);
        
        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel checkInLabel = new JLabel("Check-in List - Reception", SwingConstants.CENTER);
        checkInLabel.setFont(new Font("Arial", Font.BOLD, 14));
        topPanel.add(checkInLabel, BorderLayout.NORTH);
        topPanel.add(new JScrollPane(checkInTable), BorderLayout.CENTER);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        JLabel checkOutLabel = new JLabel("Check-out List - Reception", SwingConstants.CENTER);
        checkOutLabel.setFont(new Font("Arial", Font.BOLD, 14));
        bottomPanel.add(checkOutLabel, BorderLayout.NORTH);
        bottomPanel.add(new JScrollPane(checkOutTable), BorderLayout.CENTER);
        
        receptionPanel.add(topPanel, BorderLayout.NORTH);
        receptionPanel.add(bottomPanel, BorderLayout.CENTER);
        
        // Add refresh button
        JButton refreshReceptionBtn = new JButton("Refresh Reception Data");
        refreshReceptionBtn.addActionListener(e -> refreshReceptionData());
        receptionPanel.add(refreshReceptionBtn, BorderLayout.SOUTH);
        
        tabbedPane.addTab("Reception Dashboard", receptionPanel);
    }

    private void createHousekeepingTab() {
        JPanel housekeepingPanel = new JPanel(new BorderLayout());
        
        // Supplies tracking table
        String[] suppliesColumns = {"Item Name", "Used Today", "Remaining", "Status", "Last Restocked"};
        suppliesTableModel = new DefaultTableModel(suppliesColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable suppliesTable = new JTable(suppliesTableModel);
        suppliesTable.setRowHeight(25);
        
        // Cleaning status table
        String[] cleaningColumns = {"Room Number", "Status", "Last Cleaned", "Reason", "Assigned Staff"};
        cleaningStatusTableModel = new DefaultTableModel(cleaningColumns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        JTable cleaningTable = new JTable(cleaningStatusTableModel);
        cleaningTable.setRowHeight(25);
        
        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel suppliesLabel = new JLabel("Supplies Tracking - Housekeeping", SwingConstants.CENTER);
        suppliesLabel.setFont(new Font("Arial", Font.BOLD, 14));
        topPanel.add(suppliesLabel, BorderLayout.NORTH);
        topPanel.add(new JScrollPane(suppliesTable), BorderLayout.CENTER);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        JLabel cleaningLabel = new JLabel("Room Cleaning Status - Housekeeping", SwingConstants.CENTER);
        cleaningLabel.setFont(new Font("Arial", Font.BOLD, 14));
        bottomPanel.add(cleaningLabel, BorderLayout.NORTH);
        bottomPanel.add(new JScrollPane(cleaningTable), BorderLayout.CENTER);
        
        housekeepingPanel.add(topPanel, BorderLayout.NORTH);
        housekeepingPanel.add(bottomPanel, BorderLayout.CENTER);
        
        // Add refresh button
        JButton refreshHousekeepingBtn = new JButton("Refresh Housekeeping Data");
        refreshHousekeepingBtn.addActionListener(e -> refreshHousekeepingData());
        housekeepingPanel.add(refreshHousekeepingBtn, BorderLayout.SOUTH);
        
        tabbedPane.addTab("Housekeeping Dashboard", housekeepingPanel);
    }

    private void createGuestTab() {
        JPanel guestPanel = new JPanel(new BorderLayout());
        
        // Room booking form
        JPanel bookingForm = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        
        JLabel titleLabel = new JLabel("Room Booking - Guest Portal", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 16));
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        bookingForm.add(titleLabel, gbc);
        
        // Booking form fields
        gbc.gridwidth = 1;
        gbc.gridy = 1; gbc.gridx = 0;
        bookingForm.add(new JLabel("Guest Name:"), gbc);
        gbc.gridx = 1;
        JTextField guestNameField = new JTextField(20);
        bookingForm.add(guestNameField, gbc);
        
        gbc.gridy = 2; gbc.gridx = 0;
        bookingForm.add(new JLabel("Room Type:"), gbc);
        gbc.gridx = 1;
        JComboBox<String> roomTypeCombo = new JComboBox<>(new String[]{"Standard", "Deluxe", "Suite", "Penthouse"});
        bookingForm.add(roomTypeCombo, gbc);
        
        gbc.gridy = 3; gbc.gridx = 0;
        bookingForm.add(new JLabel("Check-in Date:"), gbc);
        gbc.gridx = 1;
        JTextField checkInField = new JTextField(20);
        bookingForm.add(checkInField, gbc);
        
        gbc.gridy = 4; gbc.gridx = 0;
        bookingForm.add(new JLabel("Check-out Date:"), gbc);
        gbc.gridx = 1;
        JTextField checkOutField = new JTextField(20);
        bookingForm.add(checkOutField, gbc);
        
        gbc.gridy = 5; gbc.gridx = 0;
        bookingForm.add(new JLabel("Total Amount (₹):"), gbc);
        gbc.gridx = 1;
        JTextField amountField = new JTextField(20);
        amountField.setEditable(false);
        bookingForm.add(amountField, gbc);
        
        // Calculate amount button
        JButton calculateBtn = new JButton("Calculate Amount");
        calculateBtn.addActionListener(e -> {
            String roomType = (String) roomTypeCombo.getSelectedItem();
            int nights = 2; // Default for demo
            int amount = calculateRoomAmount(roomType, nights);
            amountField.setText(String.valueOf(amount));
        });
        gbc.gridy = 6; gbc.gridx = 0; gbc.gridwidth = 2;
        bookingForm.add(calculateBtn, gbc);
        
        // Book room button
        JButton bookBtn = new JButton("Book Room & Proceed to Payment");
        bookBtn.addActionListener(e -> {
            String guestName = guestNameField.getText();
            String roomType = (String) roomTypeCombo.getSelectedItem();
            String amount = amountField.getText();
            
            if (guestName.isEmpty() || amount.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Please fill all fields and calculate amount first!");
                return;
            }
            
            // Simulate payment process
            int result = JOptionPane.showConfirmDialog(this, 
                "Proceed to payment of ₹" + amount + " for " + roomType + " room?", 
                "Payment Confirmation", 
                JOptionPane.YES_NO_OPTION);
            
            if (result == JOptionPane.YES_OPTION) {
                JOptionPane.showMessageDialog(this, "Payment successful! Redirecting to guest features...");
                // Here you would redirect to guest dashboard
                tabbedPane.setSelectedIndex(4); // Switch to guest features tab
            }
        });
        gbc.gridy = 7; gbc.gridx = 0; gbc.gridwidth = 2;
        bookingForm.add(bookBtn, gbc);
        
        guestPanel.add(bookingForm, BorderLayout.NORTH);
        
        // Guest features panel
        JPanel featuresPanel = new JPanel(new GridLayout(2, 2, 10, 10));
        featuresPanel.setBorder(BorderFactory.createTitledBorder("Guest Features"));
        
        JButton roomServiceBtn = new JButton("Room Service");
        roomServiceBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Room Service feature coming soon!"));
        
        JButton spaBtn = new JButton("Spa & Wellness");
        spaBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Spa booking feature coming soon!"));
        
        JButton conciergeBtn = new JButton("Concierge");
        conciergeBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Concierge service coming soon!"));
        
        JButton wifiBtn = new JButton("WiFi Access");
        wifiBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "WiFi: JAVA_HOTEL_GUEST\nPassword: Welcome123"));
        
        featuresPanel.add(roomServiceBtn);
        featuresPanel.add(spaBtn);
        featuresPanel.add(conciergeBtn);
        featuresPanel.add(wifiBtn);
        
        guestPanel.add(featuresPanel, BorderLayout.CENTER);
        
        tabbedPane.addTab("Guest Portal", guestPanel);
    }

    private int calculateRoomAmount(String roomType, int nights) {
        int basePrice = switch (roomType) {
            case "Standard" -> 10000;
            case "Deluxe" -> 16700;
            case "Suite" -> 29200;
            case "Penthouse" -> 50000;
            default -> 10000;
        };
        return basePrice * nights;
    }

    private void loadSampleData() {
        loadRevenueData();
        loadCheckInData();
        loadCheckOutData();
        loadSuppliesData();
        loadCleaningStatusData();
    }

    private void loadRevenueData() {
        String[][] revenueData = {
            {"2025-10-18", "Standard", "150000", "85%", "Active"},
            {"2025-10-18", "Deluxe", "250500", "78%", "Active"},
            {"2025-10-18", "Suite", "438000", "92%", "Active"},
            {"2025-10-18", "Penthouse", "200000", "60%", "Active"},
            {"2025-10-17", "Standard", "120000", "80%", "Completed"},
            {"2025-10-17", "Deluxe", "200000", "75%", "Completed"}
        };
        
        for (String[] row : revenueData) {
            revenueTableModel.addRow(row);
        }
    }

    private void loadCheckInData() {
        String[][] checkInData = {
            {"John Smith", "205", "14:30", "2 nights", "33400", "Checked In"},
            {"Sarah Johnson", "312", "15:45", "3 nights", "50100", "Checked In"},
            {"Mike Wilson", "108", "16:20", "1 night", "10000", "Checked In"},
            {"Emma Davis", "401", "17:00", "2 nights", "100000", "Checked In"},
            {"David Brown", "503", "18:15", "1 night", "50000", "Checked In"}
        };
        
        for (String[] row : checkInData) {
            checkInTableModel.addRow(row);
        }
    }

    private void loadCheckOutData() {
        String[][] checkOutData = {
            {"Alice Cooper", "201", "11:00", "25000", "Paid"},
            {"Bob Miller", "309", "11:30", "45000", "Paid"},
            {"Carol White", "105", "12:00", "15000", "Paid"},
            {"Tom Green", "407", "12:30", "75000", "Paid"}
        };
        
        for (String[] row : checkOutData) {
            checkOutTableModel.addRow(row);
        }
    }

    private void loadSuppliesData() {
        String[][] suppliesData = {
            {"Towels", "45", "120", "Good", "2025-10-17"},
            {"Soap", "25", "80", "Good", "2025-10-16"},
            {"Shampoo", "30", "60", "Low", "2025-10-15"},
            {"Toilet Paper", "50", "200", "Good", "2025-10-17"},
            {"Bed Sheets", "20", "150", "Good", "2025-10-16"},
            {"Cleaning Spray", "15", "25", "Critical", "2025-10-14"}
        };
        
        for (String[] row : suppliesData) {
            suppliesTableModel.addRow(row);
        }
    }

    private void loadCleaningStatusData() {
        String[][] cleaningData = {
            {"101", "Clean", "2025-10-18 10:00", "Regular cleaning", "Staff-001"},
            {"102", "Dirty", "2025-10-17 15:30", "Guest checkout", "Staff-002"},
            {"103", "Cleaning", "2025-10-18 14:00", "Maintenance required", "Staff-003"},
            {"104", "Clean", "2025-10-18 11:30", "Regular cleaning", "Staff-001"},
            {"105", "Dirty", "2025-10-18 12:00", "Guest checkout", "Staff-004"},
            {"106", "Maintenance", "2025-10-17 16:00", "AC repair needed", "Maintenance"},
            {"107", "Clean", "2025-10-18 09:00", "Regular cleaning", "Staff-001"},
            {"108", "Dirty", "2025-10-18 13:00", "Guest checkout", "Staff-002"}
        };
        
        for (String[] row : cleaningData) {
            cleaningStatusTableModel.addRow(row);
        }
    }

    private void refreshRevenueData() {
        revenueTableModel.setRowCount(0);
        loadRevenueData();
        JOptionPane.showMessageDialog(this, "Revenue data refreshed!");
    }

    private void refreshManagerData() {
        checkInTableModel.setRowCount(0);
        revenueTableModel.setRowCount(0);
        loadCheckInData();
        loadRevenueData();
        JOptionPane.showMessageDialog(this, "Manager data refreshed!");
    }

    private void refreshReceptionData() {
        checkInTableModel.setRowCount(0);
        checkOutTableModel.setRowCount(0);
        loadCheckInData();
        loadCheckOutData();
        JOptionPane.showMessageDialog(this, "Reception data refreshed!");
    }

    private void refreshHousekeepingData() {
        suppliesTableModel.setRowCount(0);
        cleaningStatusTableModel.setRowCount(0);
        loadSuppliesData();
        loadCleaningStatusData();
        JOptionPane.showMessageDialog(this, "Housekeeping data refreshed!");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            new HotelManagementGUI().setVisible(true);
        });
    }
}
