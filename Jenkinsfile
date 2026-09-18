pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'CI=true npm test'
            }
        }

        stage('Docker build') {
            steps {
                sh 'docker build -t streamerdle:${BUILD_NUMBER} .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /home/furkan/streamerdle
                    git pull
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
