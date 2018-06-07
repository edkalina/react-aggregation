import React from 'react';
import ReactFiberReconciler from "react-reconciler";
import AggregatableInner from './AggregatableInner';

const emptyObject = {};

const AggrRenderer = ReactFiberReconciler({
  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent() {
    return false;
  },

  createInstance(type, props, root) {
    if (type !== AggregatableInner) {
      throw new Error(`'${type}' is invalid in aggregation context`);
    }

    if (props.id !== root.id) {
      throw new Error(`Wrong Aggregatable component used in aggregation context`);
    }

    return { data: props.data };
  },

  finalizeInitialChildren() {
    return false;
  },

  appendInitialChild() {
    throw new Error("Not implemented");
  },

  createTextInstance() {
    throw new Error(`Text is not allowed in aggregation context`);
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  now: Date.now,
  isPrimaryRenderer: false,
  supportsMutation: true,

  appendChildToContainer(root, child) {
    root.items.push(child);
    root.update();
  },

  insertInContainerBefore(root, child, beforeChild) {
    const { items } = root;
    const index = items.findIndex(item => item === beforeChild);

    if (index < 0) {
      throw new Error("BeforeChild was not found");
    }

    root.items = [...items.slice(0, index), child, ...items.slice(index)];
    root.update();
  },

  removeChildFromContainer(root, child) {
    root.items = root.items.filter(item => item !== child);
    root.update();
  },

  prepareUpdate(instance, type, oldProps, newProps, root) {
    return root;
  },

  commitUpdate(instance, root, type, oldProps, newProps) {
    instance.data = newProps.data;
    root.update();
  }
});

AggrRenderer.injectIntoDevTools({
  findFiberByHostInstance: () => null,
  bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
  version: React.version || 16,
  rendererPackageName: 'react-aggregation'
});

export default AggrRenderer;
