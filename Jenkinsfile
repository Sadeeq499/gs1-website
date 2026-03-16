pipeline {
    agent any
    environment {
        ENV_FILE_PATH = "C:\\tools\\Jenkins\\Envs\\gs1-ksa-website\\.env"
    }
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')
    }
    stages {
        stage('Checkout') {
            steps {
                echo "📦 Cloning GS1 Website repository..."
                checkout scmGit(
                    branches: [[name: '*/main']], 
                    extensions: [], 
                    userRemoteConfigs: [[
                        credentialsId: 'gs1ksa-jenkins', 
                        url: 'https://github.com/Sadeeq499/gs1-website.git'
                    ]]
                )
            }
        }
        stage('Setup Environment File') {
            steps {
                echo "📁 Copying .env file to the frontend root..."
                bat "copy \"${ENV_FILE_PATH}\" \"%WORKSPACE%\\.env\""
            }
        }
        stage('Install & Build Frontend') {
            steps {
                echo "🧹 Cleaning previous node_modules..."
                bat 'if exist node_modules rmdir /s /q node_modules'
                echo "📦 Installing dependencies..."
                bat 'npm config set registry https://registry.npmjs.org/'
                bat 'npm install'
                echo "🔨 Building Next.js application..."
                bat 'npm run build'
            }
        }
        stage('Manage PM2 Process') {
            steps {
                script {
                    def processExists = bat(script: 'pm2 list | findstr gs1-website-new', returnStatus: true)
                    if (processExists == 0) {
                        bat 'pm2 restart gs1-website-new'
                    } else {
                        bat 'pm2 start ecosystem.config.cjs'
                    }
                    bat 'pm2 save'
                }
            }
        }
    }
}