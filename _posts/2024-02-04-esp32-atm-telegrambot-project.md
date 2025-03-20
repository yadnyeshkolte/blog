---
title: ESP32 ATM Telegram Bot Project
date: 2025-02-04 17:00:00  +0530
categories:
  - C++
  - Embedded
  - Docs
tags:
  - architecture
  - components
  - features
  - implementation
  - docs
  - project
  - esp-32
  - telegram
  - atm
  - microcontroller
youtubeId: 1mQ0rEVkSAc
---
# ESP32 ATM Telegram Bot Project

## Project Overview
This project implements an ATM-like functionality using an ESP32 microcontroller, Telegram Bot, and Google Sheets integration. The system allows users to perform banking operations like login, withdraw money, deposit funds, check balance, and view transaction records through a Telegram bot interface.

## Hardware Requirements
- ESP32 Microcontroller
- Breadboard (optional)
- Jumper Wires
- Wi-Fi Connection

## Software Requirements
- Arduino IDE
- ESP32 Board Support Package
- Libraries:
  - WiFi.h
  - WiFiClientSecure.h
  - UniversalTelegramBot
  - ArduinoJson
  - HTTPClient

{% include youtubePlayer.html id=page.youtubeId %}
## Project Components

### 1. Telegram Bot Configuration
- **Bot Token**: A unique identifier for your Telegram bot
- **Chat ID**: Your personal chat ID for authentication
- **Username/Password Authentication**
- **OTP (One-Time Password) Login**

### 2. Key Features
- User Authentication
- Balance Inquiry
- Money Withdrawal
- Money Deposit
- Transaction History
- Touch-based Input Interface

## Main Code Explanation

### WiFi and Telegram Bot Setup
```cpp
#define BOTtoken "YOUR_BOT_TOKEN"
#define CHAT_ID "YOUR_CHAT_ID"

WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);
```

### Touch Input Function
```cpp
int getTouchValue(String val) {
    // Touch-based input for OTP and amount
    if (val == "otp input") {
        for (int x = 0; x < 9; x++)
            otp_ip[x] = touchRead(pinOrder[x]);
    }
    // Additional input logic
}
```

### Command Handling
```cpp
void newCommand(int numNewMessages) {
    // Handle different Telegram bot commands
    // /start, /login, /withdraw, /deposit, /balance, /records
}
```

### Withdrawal and Deposit Logic
```cpp
if (text == "/withdraw") {
    // Input amount using touch pins
    // Validate amount
    // Update balance
    // Manage note denominations
}
```

## Google Apps Script Integration
```javascript
function doGet(e) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    
    // Receive data from ESP32
    var data1 = e.parameter.data1;
    var data2 = e.parameter.data2;
    
    // Write data to Google Sheets
    sheet.appendRow([new Date(), data1, data2]);
    
    return ContentService.createTextOutput("Success");
}
```

### Apps Script Configuration
1. Open Google Sheets
2. Tools > Script editor
3. Create new script with the above code
4. Deploy as Web App
5. Get the script URL for ESP32 integration

## Code Breakdown

## Global Variables and Definitions
```cpp
// WiFi Credentials
const char* ssid = "Ammmmm";
const char* password = "yadnyesh2289";

// Telegram Bot Configuration
#define BOTtoken "5924533106:AAEeuVoDofcxB71JC0U4CP_txzfCLNzs0bU"
#define CHAT_ID "1783892261"
```
- **Purpose**: Store WiFi and Telegram Bot credentials
- Defines connection parameters for network and bot authentication

## State Variables
```cpp
int otp;  // One-Time Password
int otp_ip[9];  // OTP input array
int amount_ip[9];  // Amount input array
int withdraw_amount[5];  // Withdraw amount digits
int pinOrder[9] = { 4, 2, 15, 13, 12, 14, 27, 33, 32 };  // Touch pin configuration

int incorrect_otp_flag = 0;  // OTP verification flag
int authorised_flag = 0;  // User authentication status
int amount = 15000;  // Initial account balance

int notesleft[] = { 5, 10, 10 };  // Note denominations stock
int denominations[] = { 200, 100, 50 };  // Available note denominations

int transactions[5];  // Transaction history
int transactionCount = 0;  // Number of transactions
```
- Manages system state
- Tracks authentication, balance, notes, and transactions
- Configures touch input pins

## Touch Input Function
```cpp
int getTouchValue(String val) {
    if (val == "otp input") {
        // Read touch values for OTP input
        for (int x = 0; x < 9; x++)
            otp_ip[x] = touchRead(pinOrder[x]);
        return 0;
    }
    else if (val == "amount_ip") {
        // Read touch values for amount input
        int retval = 99;
        for (int x = 0; x < 9; x++)
            amount_ip[x] = touchRead(pinOrder[x]);
        
        for (int y = 0; y < 9; y++) {
            if (amount_ip[y] < 60 && y != 1)
                retval = y;
        }
        return retval;
    }
}
```
- Implements touch-based input mechanism
- Supports OTP and amount input through touch pins
- Returns detected digit or special values

## Command Processing Function
```cpp
void newCommand(int numNewMessages) {
    for (int i = 0; i < numNewMessages; i++) {
        String chat_id = String(bot.messages[i].chat_id);
        
        // Chat ID authentication
        if (chat_id != CHAT_ID) {
            bot.sendMessage(chat_id, "Unauthorized user", "");
            continue;
        }
        
        String text = bot.messages[i].text;
        
        // Command handling
        if (text == "/start") {
            // Display welcome message and available commands
        }
        
        if (text == "/userlogin") {
            // Username-based login flow
        }
        
        if (text == "/login") {
            // OTP-based login mechanism
            // Generate and validate OTP
        }
        
        if (text == "/withdraw") {
            // Withdrawal process
            // Touch-based amount input
            // Balance update
            // Note denomination management
        }
        
        if (text == "/deposit") {
            // Deposit process
            // Similar to withdrawal with balance addition
        }
        
        if (text == "/balance") {
            // Display current account balance
        }
        
        if (text == "/records") {
            // Show transaction history
        }
    }
}
```
- Central command processing function
- Handles all Telegram bot interactions
- Implements authentication and transaction logic

## Setup Function
```cpp
void setup() {
    Serial.begin(115200);
    
    // Pin mode configuration
    pinMode(2, INPUT);
    pinMode(4, INPUT);
    // ... (other pin configurations)
    
    // WiFi Connection
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    
    // Wait for WiFi connection
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }
    
    // Print IP address
    Serial.println(WiFi.localIP());
}
```
- Initialize serial communication
- Configure input pins
- Establish WiFi connection
- Print network details

## Main Loop Function
```cpp
void loop() {
    if (millis() > lastTimeBotRan + botRequestDelay) {
        // Check for new Telegram messages
        int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        
        while (numNewMessages) {
            Serial.println("got response");
            newCommand(numNewMessages);
            
            // Continuously check for new messages
            numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        }
        
        lastTimeBotRan = millis();
    }
}
```
- Continuously poll for Telegram bot updates
- Process incoming messages
- Maintain bot responsiveness

### telegram_atm_bot.py
```Python
import telebot
import random
import sqlite3

class TelegramATMBot:
    def __init__(self, bot_token):
        self.bot = telebot.TeleBot(bot_token)
        self.authorized_users = {}
        self.account_balance = 15000
        self.transactions = []
        self.denominations = [200, 100, 50]
        self.notes_left = [5, 10, 10]
        
        # Setup bot message handlers
        self.register_handlers()

    def register_handlers(self):
        @self.bot.message_handler(commands=['start'])
        def send_welcome(message):
            """Display welcome message and available commands"""
            welcome_text = """
            Welcome to ATM Bot! 
            Available Commands:
            /login - Login to ATM
            /withdraw - Withdraw money
            /deposit - Deposit money
            /balance - Check balance
            /transactions - View transaction history
            """
            self.bot.reply_to(message, welcome_text)

    def authenticate(self, user_id):
        """User authentication mechanism"""
        otp = random.randint(1000, 9999)
        # Send OTP via Telegram
        self.bot.send_message(user_id, f"Your OTP is: {otp}")
        return self.verify_otp(user_id, otp)

    def verify_otp(self, user_id, generated_otp):
        """OTP verification logic"""
        # Implement OTP verification mechanism
        pass

    def withdraw_money(self, amount):
        """Money withdrawal logic"""
        if amount % 100 != 0:
            return "Invalid amount. Must be multiple of 100."
        
        if amount > self.account_balance:
            return "Insufficient funds."
        
        # Implement note dispensing logic
        temp_amount = amount
        for i, denomination in enumerate(self.denominations):
            while self.notes_left[i] > 0 and temp_amount >= denomination:
                temp_amount -= denomination
                self.notes_left[i] -= 1
        
        self.account_balance -= amount
        self.transactions.append(amount)
        return f"Withdrawn {amount}. Remaining balance: {self.account_balance}"

    def deposit_money(self, amount):
        """Money deposit logic"""
        if amount % 100 != 0:
            return "Invalid amount. Must be multiple of 100."
        
        self.account_balance += amount
        self.transactions.append(amount)
        return f"Deposited {amount}. New balance: {self.account_balance}"

    def check_balance(self):
        """Balance inquiry"""
        return f"Current Balance: {self.account_balance}"

    def view_transactions(self):
        """View transaction history"""
        return "\n".join([f"Transaction {i+1}: {amt}" for i, amt in enumerate(self.transactions)])

# Bot initialization and running
bot_token = 'YOUR_TELEGRAM_BOT_TOKEN'
atm_bot = TelegramATMBot(bot_token)
atm_bot.bot.polling()
```

### main.cpp
```C++
#include < WiFiClientSecure.h >
#include < UniversalTelegramBot.h >
#include < ArduinoJson.h >
#include < HTTPClient.h >
const char* ssid = "Ammmmm";
const char* password = "yadnyesh2289";
//define chat_id and bottoken
#define BOTtoken "5924533106:AAEeuVoDofcxB71JC0U4CP_txzfCLNzs0bU"
#define CHAT_ID "1783892261"
int otp;
int v;
int otp_ip[9];
int amount_ip[9];
int withdraw_amount[5];
int pinOrder[9] = { 4, 2, 15, 13, 12, 14, 27, 33, 32 };
int incorrect_otp_flag = 0;
int authorised_flag = 0;
int amount = 15000;
int notesleft[] = { 5, 10, 10 };
int denominations[] = { 200, 100, 50 };
int transactions[5];
int transactionCount = 0;
WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);
// Checking for new commands every 1 second.
int botRequestDelay = 1000;
unsigned long lastTimeBotRan;
//function to return the touch value inputted from touch pins
int getTouchValue(String val) {
    //for otp input
    if (val == "otp input") {
        for (int x = 0; x < 9; x++)
        otp_ip[x] = touchRead(pinOrder[x]);
        return 0;
    }
    //for amount input
    else if (val == "amount_ip") {
int retval = 99;
        Serial.println("enter");
        for (int x = 0; x < 9; x++)
        amount_ip[x] = touchRead(pinOrder[x]);
        for (int y = 0; y < 9; y++) {
            if (amount_ip[y] < 60 && y != 1)
                retval = y;
        } return retval;
    }
}
void newCommand(int numNewMessages) {
    Serial.println("New Command Found");
    for (int i = 0; i < numNewMessages; i++) {
String chat_id = String(bot.messages[i].chat_id);
        if (chat_id != CHAT_ID) {
            bot.sendMessage(chat_id, "Unauthorized user", "");
            continue;
        }
String text = bot.messages[i].text;
        Serial.println(text);
        if (text == "/start") {
String welcome = "Welcome, \n";
            welcome += "Use the following commands to control your outputs.\n\n";
            welcome += "/login to login into the atm.\n";
            welcome += "/withdraw to withdraw money.\n";
            welcome += "/balance to check your account balance.\n";
            welcome += "/records to get a record of previous transactions.\n";
            welcome += "/userlogin to login by username.\n";
            welcome += "/deposit to deposit money.\n";
            bot.sendMessage(chat_id, welcome, "");
        }
        if (text == "/userlogin") {
            bot.sendMessage(chat_id, "Please enter username.\n", "");
        }
        if (text == "yadnyesh") {
            bot.sendMessage(chat_id, "Please type your password.\n", "");
        }
        if (text == "kolte") {
            bot.sendMessage(chat_id, "Your account is been verified. Type /withdraw or /deposit.\n", "");
            authorised_flag = 1;
        }
        if (text == "/login") {
            otp = random(1, 9);
            bot.sendMessage(chat_id, "Your OTP for login is ..." + String(otp), "");
            delay(9000);
int ff = getTouchValue("otp input");
            for (int k = 0; k < 8; k++) {
                Serial.println(otp_ip[k]);
            }
            for (int k = 0; k < 8 && k != otp / 10 && k != otp % 10; k++) {
                if (otp_ip[k] <= 50) {
                    incorrect_otp_flag = 1;
                    break;
                }
            }
            if ((incorrect_otp_flag == 0) && (otp_ip[otp % 10] <= 50) && (otp_ip[otp / 10] <= 50)) {
                bot.sendMessage(chat_id, "Welcome! You have been ... authorised!", "");
                authorised_flag = 1;
            } else {
                bot.sendMessage(chat_id, "Incorrect OTP. Please ... try and login again", "");
            }
        }
        if (text == "/withdraw") {
            if (authorised_flag == 0)
                bot.sendMessage(chat_id, "Unauthorised User", "");
            else {
                bot.sendMessage(chat_id, "Input the amount using touch pins when instructed. Don't press anything if you dont wish to
enter a digit", "");for (int countDigit = 0; countDigit < 5; countDigit++) {
bot.sendMessage(chat_id, "Enter ... digit" + String(countDigit), "");
                delay(1000);
                withdraw_amount[countDigit] = getTouchValue("amount_ip");
                delay(1000);
            }
int sum = 0;
            for (int countDigit = 0; countDigit < 5; countDigit++) {
                if (withdraw_amount[countDigit] != 99)
                    sum = (sum * 10) + withdraw_amount[countDigit];
            }
            bot.sendMessage(chat_id, String(sum), "");
            if (sum % 100 == 0) {
                bot.sendMessage(chat_id, "Amount withdrawn is ..." + String(sum), "");
                amount = amount - sum;
                bot.sendMessage(chat_id, "Remaining balance is ..." + String(amount), "");
int temp = sum;
int i = 0;
                for (i = 0; i < 3; i++) {
                    while (notesleft[i] > 0 && temp > denominations[i]) {
                        temp = temp - denominations[i];
                        notesleft[i] = notesleft[i] - 1;
                    }
                    if (temp == 0)
                        break;
                }
                Serial.print(notesleft[0]);
                Serial.print(notesleft[1]);
                Serial.print(notesleft[2]);
                transactions[transactionCount] = sum;
                transactionCount++;
            } else
                bot.sendMessage(chat_id, "Invalid amount. Please ...withdraw again", "");
        }
    }
    if (text == "/deposit") {
        if (authorised_flag == 0)
            bot.sendMessage(chat_id, "Unauthorised User", "");
        else {
            bot.sendMessage(chat_id, "Input the amount using touch pins when instructed. Don't press anything if you dont wish to
enter a digit", "");
for (int countDigit = 0; countDigit < 5; countDigit++) {
                bot.sendMessage(chat_id, "Enter ... digit" + String(countDigit), "");
                delay(1000);
                withdraw_amount[countDigit] = getTouchValue("amount_ip");
                delay(1000);
            }
int sum = 0;
            for (int countDigit = 0; countDigit < 5; countDigit++) {
                if (withdraw_amount[countDigit] != 99)
                    sum = (sum * 10) + withdraw_amount[countDigit];
            }
            bot.sendMessage(chat_id, String(sum), "");
            if (sum % 100 == 0) {
                bot.sendMessage(chat_id, "Amount diposited is ..." + String(sum), "");
                amount = amount + sum;
                bot.sendMessage(chat_id, "Actual Balance balance is ..." + String(amount), "");
int temp = sum;int i = 0;
                for (i = 0; i < 3; i++) {
                    while (notesleft[i] > 0 && temp > denominations[i]) {
                        temp = temp - denominations[i];
                        notesleft[i] = notesleft[i] - 1;
                    }
                    if (temp == 0)
                        break;
                }
                Serial.print(notesleft[0]);
                Serial.print(notesleft[1]);
                Serial.print(notesleft[2]);
                transactions[transactionCount] = sum;
                transactionCount++;
            } else
                bot.sendMessage(chat_id, "Invalid amount. Please ...withdraw again", "");
        }
    }
    if (text == "/balance") {
        if (authorised_flag == 0)
            bot.sendMessage(chat_id, "Unauthorised User", "");
        else {
String avail_bal = "Balance Available is ..." + String(amount);
            bot.sendMessage(chat_id, avail_bal, "");
        }
    }
    if (text == "/records") {
String ans = "You have " + String(transactionCount) + " ...previous transactions ";
String rec;
        for (int l = 0; l < transactionCount; l++)
        rec = rec + "Rs " + String(transactions[l]) + ",";
        bot.sendMessage(chat_id, ans, "");
        bot.sendMessage(chat_id, rec, "");
    }
}
}
void setup() {
    Serial.begin(115200);
    #ifdef ESP8266
    client.setInsecure();
    #endif
    pinMode(2, INPUT);
    pinMode(4, INPUT);
    pinMode(15, INPUT);
    pinMode(13, INPUT);
    pinMode(12, INPUT);
    pinMode(14, INPUT);
    pinMode(27, INPUT);
    pinMode(33, INPUT);
    pinMode(32, INPUT);
    // Connect to Wi−Fi
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    client.setCACert(TELEGRAM_CERTIFICATE_ROOT);
    WiFi.setSleep(false);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }
    // Print ESP32 Local IP Address
    Serial.println(WiFi.localIP());
}
void loop() {
    if (millis() > lastTimeBotRan + botRequestDelay) {
int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        while (numNewMessages) {
            Serial.println("got response");
            newCommand(numNewMessages);
            numNewMessages = bot.getUpdates(bot.last_message_received + 1);
        }
        lastTimeBotRan = millis();
    }
}
/*
#include "WiFi.h"
#include <HTTPClient.h>
// WiFi credentials
const char* ssid = "Ammmmm"; // change SSID
const char* password = "yadnyesh2289"; // change password
// Google script ID and required credentials
String GOOGLE_SCRIPT_ID = "AKfycbwENyTEUDVFwheGLLUIYYrwQsdUEnJN6-iVyBm1W-
TXdFWKbQFcD1Qp32vLgLJrve1gjw";
int count1 = 0;
int count2 = 0;
void setup () {
delay (1000);
Serial.begin(115200);
delay(1000);
// connect to WiFi
Serial.println ();
Serial.print("Connecting to wifi: ");
Serial.println(ssid);
Serial.flush() ;
WiFi.begin (ssid, password);
while (WiFi.status() != WL_CONNECTED)
{
delay (500);
Serial.print(".");
}
}
void loop () {
if (WiFi.status () == WL_CONNECTED) {
count2 = count1 *count1;
String urlFinal = "https://script.google.com/macros/s/"+GOOGLE_SCRIPT_ID+
"/exec?"+"data1=" + String (count1) + "&data2=" + String (count2);
Serial.print ("POST data to spreadsheet:");
Serial.println (urlFinal);
HTTPClient http;
http.begin (urlFinal.c_str () );
http.setFollowRedirects (HTTPC_STRICT_FOLLOW_REDIRECTS) ;
int httpCode = http.GET () ;
Serial.print ("HTTP Status Code: ");
Serial.println (httpCode);
http.end () ;
}
count1++;
delay (1000);
}
*/
```

### TelegramATMBot.java
```Java
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import java.util.ArrayList;
import java.util.Random;

public class TelegramATMBot extends TelegramLongPollingBot {
    private static final String BOT_TOKEN = "YOUR_BOT_TOKEN";
    private static final String BOT_USERNAME = "your_bot_username";

    // Account Management Variables
    private double accountBalance = 15000.0;
    private List<Double> transactions = new ArrayList<>();
    private int[] denominations = {200, 100, 50};
    private int[] notesLeft = {5, 10, 10};
    private boolean isAuthorized = false;

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            long chatId = update.getMessage().getChatId();

            switch (messageText) {
                case "/start":
                    sendWelcomeMessage(chatId);
                    break;
                case "/login":
                    handleLogin(chatId);
                    break;
                case "/withdraw":
                    handleWithdraw(chatId, update);
                    break;
                case "/deposit":
                    handleDeposit(chatId, update);
                    break;
                case "/balance":
                    checkBalance(chatId);
                    break;
                case "/transactions":
                    viewTransactions(chatId);
                    break;
            }
        }
    }

    private void sendWelcomeMessage(long chatId) {
        String welcome = "Welcome to ATM Bot!\n" +
                         "Available Commands:\n" +
                         "/login - Authenticate\n" +
                         "/withdraw - Withdraw Money\n" +
                         "/deposit - Deposit Money\n" +
                         "/balance - Check Balance\n" +
                         "/transactions - View History";
        sendMessage(chatId, welcome);
    }

    private void handleLogin(long chatId) {
        // Generate OTP
        int otp = generateOTP();
        sendMessage(chatId, "Your OTP is: " + otp);
        // Implement OTP verification mechanism
    }

    private int generateOTP() {
        return new Random().nextInt(9000) + 1000;
    }

    private void handleWithdraw(long chatId, Update update) {
        if (!isAuthorized) {
            sendMessage(chatId, "Please login first!");
            return;
        }

        // Implement amount input and validation
        double amount = extractAmount(update);
        
        if (amount % 100 != 0) {
            sendMessage(chatId, "Invalid amount. Must be multiple of 100.");
            return;
        }

        if (amount > accountBalance) {
            sendMessage(chatId, "Insufficient funds!");
            return;
        }

        // Process withdrawal
        processWithdrawal(chatId, amount);
    }

    private void processWithdrawal(long chatId, double amount) {
        accountBalance -= amount;
        transactions.add(-amount);
        
        // Note dispensing logic
        double remainingAmount = amount;
        for (int i = 0; i < denominations.length; i++) {
            while (notesLeft[i] > 0 && remainingAmount >= denominations[i]) {
                remainingAmount -= denominations[i];
                notesLeft[i]--;
            }
        }

        sendMessage(chatId, "Withdrawn: " + amount + 
                    "\nRemaining Balance: " + accountBalance);
    }

    private void handleDeposit(long chatId, Update update) {
        if (!isAuthorized) {
            sendMessage(chatId, "Please login first!");
            return;
        }

        double amount = extractAmount(update);
        
        if (amount % 100 != 0) {
            sendMessage(chatId, "Invalid amount. Must be multiple of 100.");
            return;
        }

        accountBalance += amount;
        transactions.add(amount);
        sendMessage(chatId, "Deposited: " + amount + 
                    "\nNew Balance: " + accountBalance);
    }

    private void checkBalance(long chatId) {
        if (!isAuthorized) {
            sendMessage(chatId, "Please login first!");
            return;
        }
        sendMessage(chatId, "Current Balance: " + accountBalance);
    }

    private void viewTransactions(long chatId) {
        if (!isAuthorized) {
            sendMessage(chatId, "Please login first!");
            return;
        }
        
        StringBuilder transactionHistory = new StringBuilder("Transaction History:\n");
        for (int i = 0; i < transactions.size(); i++) {
            transactionHistory.append("#")
                              .append(i + 1)
                              .append(": ")
                              .append(transactions.get(i))
                              .append("\n");
        }
        sendMessage(chatId, transactionHistory.toString());
    }

    private void sendMessage(long chatId, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(String.valueOf(chatId));
        message.setText(text);
        try {
            execute(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getBotUsername() {
        return BOT_USERNAME;
    }

    @Override
    public String getBotToken() {
        return BOT_TOKEN;
    }
}
```
## Troubleshooting
- Ensure correct WiFi credentials
- Verify Telegram Bot Token
- Check touch pin configurations
- Monitor serial output for debugging

## Project Limitations
- Limited to 5-digit transactions
- Fixed initial balance of 15,000
- Stores only last 5 transactions
- Requires constant internet connection

## Deployment Steps
1. Install required libraries
2. Configure WiFi and Telegram credentials
3. Upload code to ESP32
4. Initialize Telegram bot
5. Test functionality

## Conclusion
This project demonstrates an innovative approach to creating a secure, touch-based ATM-like system using ESP32 and Telegram Bot, showcasing IoT and communication technology integration.