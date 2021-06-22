

const vnodeData = {
    "type": "div", // 可以试
    "key": null,
    "ref": null,
    "props": {  // props 可以是arr可以是string
        "className": "border",
        "children": [
            {
                "type": "p",
                "key": null,
                "ref": null,
                "props": {
                    "children": "全栈"
                },
                "_owner": null,
                "_store": {}
            },
            {
                "type": "a",
                "key": null,
                "ref": null,
                "props": {
                    "href": "https://www.kaikeba.com/",
                    "children": "开课吧"
                },
                "_owner": null,
                "_store": {}
            },
            {
                "key": null,
                "ref": null,
                "props": {
                    "name": "函数组件"
                },
                "_owner": null,
                "_store": {}
            },
            {
                "key": null,
                "ref": null,
                "props": {
                    "name": "类组件"
                },
                "_owner": null,
                "_store": {}
            }
        ]
    },
    "_owner": null,
    "_store": {}
}

function render(vnode, container) {
    const node = createNode(vnode);
    container.appendChild(node);
}

// vnode ==> node
function createNode(vnode) {
    let node = null;
    const { type } = vnode;
    if (typeof type == 'string') {
        // 原生标签
        node = updateHostComponent(vnode);
    } else if (typeof type === 'function') {
        node = type.proptype.isReactComponent ?
            updateClassCompoennt(vnode)
            : updateFunctionComponent(vnode)
    }
    return node
}

function updateHostComponent(vnode) {
    const { type, props } = vnode;
    let node = document.createElement(type)
    if (typeof props.children == 'string') {
        let childrenText = document.createTextNode(props.children)
        node.appendChild(childrenText)
    } else {
        reconcileChildren(props.children, node)
    }
    updateNodeAttr(node, props) // 更新属性
    return node
}
function updateNodeAttr(node, attrObj) {
    Object.keys(attrObj)
        .filter(k => k !== "children")
        .forEach(k => {
            node[k] = attrObj[k]
        })
}

function updateClassCompoennt(vnode) {
    const { type, props } = vnode;
    const vnodeInstance = new type(props);
    const vvnode = vnodeInstance.render();
    const node = createNode(vvnode)
    return node;
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const vvnode = type(props);
    const node = createNode(vvnode)
    return node;
}
// 循环渲染子节点
function reconcileChildren(children, node) {
    if (Array.isArray(children)) {
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            render(child, node)
        }
    } else {
        render(children, node)
    }
}

export default { render }