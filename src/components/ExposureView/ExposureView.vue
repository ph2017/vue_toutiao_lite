/**
 * 曝光组件，可以检查自身是否在可视区，
   然后执行对应的钩子函数
 */
<template>
    <div class="exposure-view" ref="exposureView">
        <slot>没有内容时显示</slot>
    </div>
</template>

<script>
    export default {
        name: 'ExposureView',
        data() {
            return {
                // events存储事件及回调函数对象，例：
                // {event1:[{handler:handler1},{handler:handler2}], event2:[{handler:handler1},{handler:handler2}]}
                events: {},
                // 包裹曝光组件的容器
                container: {},
                // 滑动事件发生时使用的定时器，记录定时器id
                timerID: undefined
            }
        },
        props: {
            /**
             * 包裹曝光组件，且
             * 要被监听scroll事件的Element
             */
            containerEl: {
                type: String,
                required: true
            },
            /**
             * on方式监听事件及回调函数的props
             * 用于定义事件及其钩子函数
             */
            onProps: {
                type: Object
                // default: () => {
                //     return {event: 'isVisiable', handler: () => {}}
                // }
            },
            /**
             * one方式监听事件及回调函数的props
             * 用于定义事件及其钩子函数
             */
            oneProps: {
                type: Object
                // default: () => {
                //     return {event: 'isVisiable', handler: () => {}}
                // }
            },
            /**
             * 曝光组件可见时要触发的事件及回调函数参数
             */
            fireProps: {
                type: Object
                // default: () => {
                //     return {event: 'isVisiable', args: []}
                // }
            }
        },
        methods: {
            /**
             * 注册监听事件及回调函数的方法
             */
             on(event, handler) {
                let exitEvent = this.events.hasOwnProperty(event);
                if (exitEvent) {
                    this.events[event].push({
                        'handler': handler
                    });
                } else {
                    this.events[event] = [{
                        'handler': handler
                    }];

                }
            },
            /**
             * 触发注册事件处理的方法
             */
            fire(event, args) {
                var exitEvent = this.events.hasOwnProperty(event);
                if (exitEvent) {
                    for (var i = 0, len = this.events[event].length; i < len; i++) {
                        this.events[event][i].handler(args);
                    }
                } else {
                    console.log('no event(' + event + ') exist');
                }
            },
            /**
             * 解除事件注册的方法
             */
            off(event) {
                var exitEvent = this.events.hasOwnProperty(event);
                if (exitEvent) {
                    delete this.events[event];
                }
            },
            /**
             * 注册只监听一次的方法
             */
            one(event, callback) {
                let self = this
                this.on(event, function() {
                    callback();
                    self.off(event);
                })
            },
            /**
             * 曝光组件是否在可使区的检测方法，
             * 在可视区，则返回:true
             */
            isVisiable: function($node) {
                let containerHeight = this.container.clientHeight
                let containerScrollTop = this.container.scrollTop
                let nodeOffsetTop = this.$refs.exposureView.offsetTop;
                // containerHeight + containerScrollTop > nodeOffsetTop 的情况下，表示组件在可视区
                if (containerHeight + containerScrollTop > nodeOffsetTop) {
                    return true;
                }
                return false;
            }
        },
        created() {
            // 曝光组件被挂载时，监听container的scroll事件
            this.$nextTick(() => {
                let self = this
                if (this.containerEl) {
                    this.container = document.querySelector(this.containerEl)
                    this.container.addEventListener('scroll', () => {
                        // 先清除定时器
                        if (self.timerID) {
                            clearTimeout(self.timerID);
                        }
                        // 使用定时器，防止滑动过快时产生多次加载，提高效率
                        self.timerID = setTimeout(function() {
                            let visiable = self.isVisiable()
                            if (visiable) {
                                console.log('曝光组件可见!!')
                                // 曝光组件可见时，自动触发回调函数
                                if (self.fireProps.args) {
                                    self.fire(self.fireProps.event, ...[self.fireProps.args])
                                } else {
                                    self.fire(self.fireProps.event)
                                }
                            
                            }
                        }, 300);
                    })
                }
                // 把父组件传进来的this.oneProps参数放入this.events中
                if (this.oneProps) {
                    this.one(this.oneProps.event, this.oneProps.handler)
                }
                if (this.onProps) {
                    this.on(this.onProps.event, this.onProps.handler)
                }
            })
        }
    }
</script>