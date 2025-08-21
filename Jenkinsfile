pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        DOCKER_IMAGE = 'bizflow-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        REGISTRY = 'your-registry.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS-20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint and Test') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        sh 'npm run check'
                    }
                }
                stage('ESLint') {
                    steps {
                        script {
                            if (fileExists('.eslintrc.js') || fileExists('.eslintrc.json')) {
                                sh 'npm run lint'
                            } else {
                                echo 'ESLint not configured, skipping...'
                            }
                        }
                    }
                }
                stage('Unit Tests') {
                    steps {
                        script {
                            if (fileExists('jest.config.js') || fileExists('vitest.config.ts')) {
                                sh 'npm test'
                            } else {
                                echo 'Test framework not configured, skipping...'
                            }
                        }
                    }
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'develop') {
                        sh '''
                            # Run Trivy security scan
                            docker run --rm -v ${WORKSPACE}:/app aquasec/trivy:latest \
                                fs --format sarif --output trivy-results.sarif /app
                        '''
                        publishSARIF pattern: 'trivy-results.sarif'
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        stage('Build Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", 'docker-registry-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Deploy to staging environment
                    sh '''
                        echo "Deploying to staging environment..."
                        # Add your staging deployment commands here
                        # Example: kubectl apply -f k8s/staging/
                        # Example: helm upgrade --install bizflow-staging ./helm-chart --values staging-values.yaml
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Deploy to production environment
                    sh '''
                        echo "Deploying to production environment..."
                        # Add your production deployment commands here
                        # Example: kubectl apply -f k8s/production/
                        # Example: helm upgrade --install bizflow-production ./helm-chart --values production-values.yaml
                    '''
                }
            }
        }

        stage('Health Check') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Wait for deployment to complete
                    sleep(time: 60, unit: 'SECONDS')

                    // Perform health check
                    sh '''
                        echo "Performing health check..."
                        # Add your health check commands here
                        # Example: curl -f https://bizflow.com/api/health
                        # Example: kubectl get pods -l app=bizflow
                    '''
                }
            }
        }

        stage('Post-deployment Tests') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Run smoke tests
                    sh '''
                        echo "Running smoke tests..."
                        # Add your smoke test commands here
                        # Example: npm run test:smoke
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }

        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    // Send success notification
                    emailext (
                        subject: "✅ BizFlow Deployment Successful - Build #${env.BUILD_NUMBER}",
                        body: """
                        <h2>Deployment Successful!</h2>
                        <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                        <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                        <p><strong>Commit:</strong> ${env.GIT_COMMIT}</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        """,
                        to: 'dev-team@bizflow.com',
                        mimeType: 'text/html'
                    )
                }
            }
        }

        failure {
            script {
                // Send failure notification
                emailext (
                    subject: "❌ BizFlow Deployment Failed - Build #${env.BUILD_NUMBER}",
                    body: """
                    <h2>Deployment Failed!</h2>
                    <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                    <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                    <p><strong>Commit:</strong> ${env.GIT_COMMIT}</p>
                    <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                    <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                    """,
                    to: 'dev-team@bizflow.com',
                    mimeType: 'text/html'
                )
            }
        }

        cleanup {
            // Clean up Docker images
            script {
                if (env.BRANCH_NAME == 'main') {
                    sh '''
                        docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
                        docker rmi ${DOCKER_IMAGE}:latest || true
                    '''
                }
            }
        }
    }
}
