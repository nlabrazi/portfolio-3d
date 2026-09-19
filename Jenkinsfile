@Library('nabster-ci') _

pipeline {
    agent {
        docker {
            image 'node:24'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Check') {
            steps {
                sh 'npm run check'
            }
        }

        stage('Unit tests') {
            steps {
                sh 'npm run test:unit'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            notifyTelegram('✅ CI SUCCESS')
        }

        failure {
            notifyTelegram('❌ CI FAILED')
        }
    }
}
