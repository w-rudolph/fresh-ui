export default {
    methods: {
        dispatch(componentName, eventName, payload) {
            let parent = this.$parent || this.$root;
            let parentName = parent.$options.name;

            while (parent && parentName !== componentName) {
                parent = parent.$parent;

                if (parent) {
                    parentName = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit(eventName, payload);
            }
        },
        broadcast(componentName, eventName, payload) {
            broadcast.apply(this, [componentName, eventName, payload]);
        },
        subscribe(eventName, fn) {
            return this.$on(eventName, fn);
        }
    }
};

function broadcast(componentName, eventName, payload) {
    this.$children.forEach(child => {
        let childName = child.$options.name;
        if (childName === componentName) {
            child.$emit(eventName, payload);
        } else {
            broadcast.apply(child, [componentName, eventName, payload]);
        }
    });
}