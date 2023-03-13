'use strict'
const { couchDBRequests } = require('@helpers/requests')

exports.enableClusterOnNode = async (url, username, password) => {
	try {
		const data = {
			action: 'enable_cluster',
			bind_address: '0.0.0.0',
			username: username,
			password: password,
			node_count: 3,
		}
		const response = await couchDBRequests.couchPOST({
			headers: { 'Content-Type': 'application/json' },
			route: `${url}/_cluster_setup`,
			body: data,
		})
		console.log(response)
	} catch (err) {
		console.log(err)
	}
}

exports.addNodeToCluster = async (nodeIp, nodePort, nodeUsername, nodePassword) => {
	try {
		const coordinatorNodeURL = 'http://admin:password@couchdb1:5984'
		const coordinatorUsername = 'admin'
		const coordinatorPassword = 'password'

		const enableClusterData = {
			action: 'enable_cluster',
			bind_address: '0.0.0.0',
			username: coordinatorUsername,
			password: coordinatorPassword,
			port: 5984,
			node_count: 3,
			remote_node: nodeIp,
			remote_current_user: nodeUsername,
			remote_current_password: nodePassword,
		}
		const enableClusterResponse = await couchDBRequests.couchPOST({
			headers: { 'Content-Type': 'application/json' },
			route: `${coordinatorNodeURL}/_cluster_setup`,
			body: enableClusterData,
		})
		console.log('enableClusterResponse: ', enableClusterResponse)

		const addNodeData = {
			action: 'add_node',
			host: nodeIp,
			port: nodePort,
			username: nodeUsername,
			password: nodePassword,
		}
		const addNodeResponse = await couchDBRequests.couchPOST({
			headers: { 'Content-Type': 'application/json' },
			route: `${coordinatorNodeURL}/_cluster_setup`,
			body: addNodeData,
		})
		console.log('addNodeResponse: ', addNodeResponse)
	} catch (err) {
		console.log(err)
	}
}

exports.finishClusterSetup = async () => {
	try {
		const coordinatorNodeURL = 'http://admin:password@couchdb1:5984'
		const finishClusterSetupData = { action: 'finish_cluster' }
		const finishClusterResponse = await couchDBRequests.couchPOST({
			headers: { 'Content-Type': 'application/json' },
			route: `${coordinatorNodeURL}/_cluster_setup`,
			body: finishClusterSetupData,
		})
		console.log('finishClusterResponse: ', finishClusterResponse)
		const verifyInstallResponse = await couchDBRequests.couchGET({
			route: `${coordinatorNodeURL}/_cluster_setup`,
		})
		console.log('verifyInstallResponse: ', verifyInstallResponse)
		const verifyClusterResponse = await couchDBRequests.couchGET({
			route: `${coordinatorNodeURL}/_membership`,
		})
		//const add = await couchDBRequests.couchPOST
		console.log('verifyClusterResponse: ', verifyClusterResponse)
	} catch (err) {
		console.log(err)
	}
}
