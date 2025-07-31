# 🌿 FloraLens

![FloraLens Welcome Screen](https://i.imgur.com/your-app-screenshot-or-gif.gif) 
<!-- TODO: Replace the URL above with a link to a GIF or screenshot of your app! -->

A modern, cross-platform mobile application built with React Native and Expo that allows users to identify plants from their camera, manage their collection, and enjoy a dynamic, theme-aware user interface.

---

## ✨ Key Features

- **AI-Powered Identification:** Snap a picture of any plant, and the app uses the Plant.id API to provide an instant identification.
- **Personal Collection:** Save identified plants to a personal collection. Users can view, rename, and delete plants from their list.
- **Dynamic Theming:** Full support for both **Light and Dark modes**, which can be toggled manually or set automatically based on the user's system preference.
- **Modern UI/UX:** Built with a focus on a clean, comfortable, and aesthetically pleasing user experience, featuring custom-designed color palettes and icons.
- **Cross-Platform:** Developed with Expo, ensuring a consistent experience on both iOS and Android devices from a single codebase.
- **Secure API Key Handling:** Uses environment variables to keep sensitive API keys out of the version control history.

---

## 🛠️ Tech Stack

- **Framework:** React Native & Expo
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack)
- **API Communication:** Axios
- **Local Storage:** AsyncStorage
- **Theming:** React Context API
- **UI Components:** Expo Linear Gradient, Expo Vector Icons

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo Go app on your iOS or Android device

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/FloraLens.git](https://github.com/your-username/FloraLens.git)
    ```
    <!-- TODO: Replace 'your-username' with your actual GitHub username -->

2.  **Navigate to the project directory:**
    ```sh
    cd FloraLens
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up your environment variables:**
    - Create a new file named `.env` in the root of the project.
    - Add your Plant.id API key to this file:
      ```
      EXPO_PUBLIC_PLANT_ID_API_KEY="your_api_key_here"
      ```

5.  **Run the application:**
    ```sh
    npx expo start
    ```
    Scan the QR code with the Expo Go app on your phone.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
## ScreenShots
![Dynamic HomeScreen](https://github.com/user-attachments/assets/e8fd6108-92ae-4a12-afbc-42758637c28a)

![Plant family detected](https://github.com/user-attachments/assets/44b8de8e-01f2-4a2b-9289-ca023dad0fd1)
![Saved List](https://github.com/user-attachments/assets/a04343ee-3b6e-4b16-bcaf-ad794a5db82e)


