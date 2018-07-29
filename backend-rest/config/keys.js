module.exports = {
    mongoURI: 'mongodb://localhost:27017/salestock_test',
    jwtKey: 'klkjAMKllkamdIIO',
    cloudinaryConfig: {
		cloudName: process.env.CLOUD_NAME || 'geektogreat',
		apiKey: process.env.API_KEY || '529797145464574',
		apiSecret: process.env.API_SECRET || 'bx8F0QgIHsFedygFlD8S8yytJiU'  
	}
}