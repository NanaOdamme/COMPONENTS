# Card Components

This project contains various card components designed using Tailwind CSS and Bootstrap Icons. The cards are versatile and can be used for different purposes such as profiles, product reviews, company information, and more. 

## Preview

![Card Components](screenshot.png)

## Getting Started

Follow these instructions to include the card components in your project.

### Prerequisites

Ensure you have the following in your project:
- Tailwind CSS
- Bootstrap Icons

You can include these via CDN as shown in the example.

### Installation

1. Copy the HTML structure of the cards from the provided code snippet.
2. Include the Tailwind CSS and Bootstrap Icons in the head section of your HTML file.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous">
  <title>Card Components</title>
</head>
<body class="p-8 bg-indigo-900 flex justify-center">
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <!-- Card Components Here -->
  </section>
</body>
</html>
