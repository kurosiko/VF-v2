import express from "express";
import React from "react";
const app = express();
app.get("/:id", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>おしゃれなプログレスバー</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
        }

        .progress-container {
            width: 80%;
            max-width: 600px;
            background-color: #e0e0e0;
            border-radius: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin: 0 auto;
        }

        .progress-bar {
            width: 0;
            height: 20px;
            background: #6a5acd; /* スレートブルー */
            border-radius: 20px 0 0 20px;
            text-align: right;
            padding-right: 10px;
            line-height: 20px;
            color: white;
            font-weight: bold;
            transition: width 0.5s ease;
        }

        .progress-bar::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 5px;
            right: 0;
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
            border-radius: 10px 0 0 10px;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .progress-bar:hover::before {
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="progress-container">
        <div class="progress-bar" style="width: 50%;">100%</div>
    </div>

    <script>
        // JavaScriptでプログレスバーを動的に操作できます。
        // 例: const progressBar = document.querySelector('.progress-bar');
        //     progressBar.style.width = '80%';
        //     progressBar.textContent = '80%';
    </script>
</body>
</html>`);
});
app.listen(3000, () => {
    console.log("Listen on port 3000");
});
