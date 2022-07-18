import React, { useState } from 'react';
import './style.css';

export default function App() {
  const data = [
    {
      id: 'l1-1',
      title: 'N1-1',
      children: [
        {
          id: 'l1-1-1',
          title: 'l1-1-1',
        },
        {
          id: 'l1-1-2',
          title: 'l1-1-2',
        },
      ],
    },
    {
      id: 'l1-2',
      title: 'N1-2',
      children: [
        {
          id: 'l2-1-1',
          title: 'l2-1-1',
          children: [
            {
              id: 'HHHHHHH',
              title: 'HHHHHH',
              children: [
                {
                  id: '23HHHHHHH',
                  title: '23HHHHHH',
                },
              ],
            },
          ],
        },
        {
          id: 'l2-1-2',
          title: 'l2-1-2',
          children: [
            {
              id: 'l3-1-2',
              title: 'l3-1-2',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Tree data={data} />
    </div>
  );
}

function Tree(props) {
  const { data } = props;

  const init = (data, id) => {
    return data.map((elem, idx) => {
      elem.hasChildren = elem.children ? true : false;
      elem.nodeID = id === undefined ? idx + '' : id + idx + '';
      if (elem.hasChildren) {
        elem.isOpen = false;
        init(elem.children, elem.nodeID);
      }
      return elem;
    });
  };

  let [toggleTree, setToggleTree] = useState(init(data));

  const nodeHandeler = (nodeID) => {
    toggleTree = JSON.parse(JSON.stringify(toggleTree));
    const ids = nodeID.split('');
    ids.reduce((parent, son, idx) => {
      if (idx < ids.length - 1) {
        
        return parent[son].children;
      }
      
      parent[son].isOpen = !parent[son].isOpen;
    }, toggleTree);
    setToggleTree(toggleTree);
  };

  const getChildren = (children) => {
    return children.map((elem) => {
      return (
        <Node
          key={elem.id}
          nodeElem={elem}
          nodeHandeler={nodeHandeler}
          getChildren={getChildren}
        />
      );
    });
  };

  return getChildren(toggleTree);
}

function Node(props) {
  const { nodeElem, nodeHandeler, getChildren } = props;

  const handler = e => {
    e.stopPropagation();
    if (nodeElem.hasChildren) {
      nodeHandeler(nodeElem.nodeID);
    }
  };

  return (
    <div className="node" onClick={handler}>
      {nodeElem.hasChildren && nodeElem.isOpen === false ? '+' : null}
      {nodeElem.hasChildren && nodeElem.isOpen === true ? '-' : null}
      {nodeElem.title}
      {nodeElem.hasChildren && nodeElem.isOpen === true
        ? getChildren(nodeElem.children)
        : null}
    </div>
  );
}
