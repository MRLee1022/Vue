import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

(function () {

    let smallFaceWs;

    let defaultOptions = {
        ip: '127.0.0.1',
        port: 15674,
    };

    let SocketClient = function (options) {

        this.options = Object.assign(defaultOptions, options);
        this.status = false;
        this.client = init.call(this);
        this.clientIds = {};
    };

    function init() {

        //专网版本：
        // if (location.search === '?ws') {
        //     smallFaceWs = new WebSocket('ws://' + this.options.ip + ':' + this.options.port + '/ws');
        // } else {
        //     smallFaceWs = new SockJS('http://' + this.options.ip + ':' + this.options.port + '/stomp');
        // }

        //内网专网通用版本
        let smallFaceClient = Stomp.client('ws://' + this.options.ip + ':' + this.options.port + '/ws');
        smallFaceClient.debug = null;
        smallFaceClient.heartbeat.outgoing = 0;
        smallFaceClient.heartbeat.incoming = 0;

        return smallFaceClient;
    }

    SocketClient.prototype.connect = function (successCallback, errCallback) {

        let that = this;

        let success_callback = function () {
            that.status = that.client.connected;
            successCallback();
        };

        let error_callback = function (error) {
            console.log("test",error);
            //console.log(new Error(error, 0));
            errCallback(new Error(error, 0));
        };

        this.client.connect('faceall', 'faceall', success_callback, error_callback, '/');
    };

    /**
     * 订阅的地址统一为:
     *     /type/exchangeName/routingKey
     *
     * @param params
     *   {
     *      urls: [{
     *          'alarm':'/type/exchangeName/routingKey'
     *      }]
     *   }
     * @param callback
     */
    SocketClient.prototype.subscribe = function (params, callback) {

        let urls = params.urls;

        if (urls && Array.isArray(urls) && urls.length) {
            urls.forEach((url, index) => {
                let key = Object.keys(url)[0];
                let addr = url[key];
                if (addr) {
                    if (!this.clientIds[key]) {
                        let result = this.client.subscribe(addr, function (data) {
                            callback && callback(data)
                        });
                        this.clientIds[key] = result.id;
                    }
                } else
                    alert('订阅参数格式有误');
            });
        } else {
            alert('订阅参数格式有误');
        }
    };

    SocketClient.prototype.unSubscribe = function (ids, callback) {
        if (ids) {
            ids = ids.split(',');

            for (let id of ids) {
                //console.log(this.clientIds[id]);
                if (this.clientIds[id]) {
                    let subId = this.clientIds[id];
                    this.client.unsubscribe(subId);
                    delete this.clientIds[id];

                }
            }

            if (typeof callback === 'function')
                callback();

        }
    };

    SocketClient.prototype.disConnect = function (callback) {
        this.client.disconnect(callback);
        this.status = this.client.connected;
    };

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function () {
            return {
                SocketClient: SocketClient
            };
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports.SocketClient = SocketClient;
    } else {
        window.SocketClient = SocketClient;
    }
}());
