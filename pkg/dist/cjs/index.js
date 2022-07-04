var $grpOf$react = require("react");
var $grpOf$reactjsxruntime = require("react/jsx-runtime");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "Connect", () => $970a9ffc6e29723e$export$59e6910693f047c2);
$parcel$export(module.exports, "ConnectProvider", () => $0295f77677accdeb$export$230737e70939b618);
$parcel$export(module.exports, "ConnectLines", () => $5adf053b231d65df$export$775ba819c8141467);


const $bbbe352e17fce460$export$b18e34ac3520f2e5 = (0, $grpOf$react.createContext)({
    elements: [],
    dispatch: ()=>null
});




function $0b003004ebdafb37$export$fc84c22acd302ca7() {
    const ctxVal = (0, $grpOf$react.useContext)((0, $bbbe352e17fce460$export$b18e34ac3520f2e5));
    if (!ctxVal) throw new Error("Missing context value");
    return (0, $grpOf$react.useContext)((0, $bbbe352e17fce460$export$b18e34ac3520f2e5));
}





function $1513afc4bf7cd5a3$export$e1957580bb403527(state, payload) {
    const { type: type , id: id , element: element , connectWith: connectWith  } = payload;
    const exists = state?.elements?.some((l)=>l.id === id);
    const connectWithArr = connectWith || [];
    const node = {
        id: id,
        element: element,
        connectWith: connectWithArr
    };
    if (type === "add" && element) {
        if (!exists) return {
            ...state,
            elements: [
                ...state.elements,
                node
            ]
        };
        if (exists) {
            const next = [
                ...state.elements
            ].map((el)=>{
                if (el.id === id) return node;
                return el;
            });
            return {
                ...state,
                elements: next
            };
        }
        return state;
    }
    if (type === "remove") return {
        ...state,
        elements: state.elements.map((x)=>{
            return {
                ...x,
                connectWith: x.connectWith?.filter((y)=>y.id !== id)
            };
        }).filter((el)=>el.id !== id)
    };
    return state;
}


function $ae672f8a57332157$export$5c92df8ce16beba9(props) {
    const { children: children  } = props;
    const [state, dispatch] = (0, $grpOf$react.useReducer)((0, $1513afc4bf7cd5a3$export$e1957580bb403527), {
        elements: [],
        dispatch: ()=>null
    });
    const ctxVal = (0, $grpOf$react.useMemo)(()=>({
            elements: state.elements,
            dispatch: dispatch
        }), [
        state
    ]);
    return /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)((0, $bbbe352e17fce460$export$b18e34ac3520f2e5).Provider, {
        value: ctxVal,
        children: children
    });
}




function $970a9ffc6e29723e$export$59e6910693f047c2(props) {
    const { children: children , id: id , connectWith: connectWith  } = props;
    const { dispatch: dispatch  } = (0, $0b003004ebdafb37$export$fc84c22acd302ca7)();
    const nodeRef = (0, $grpOf$react.useRef)();
    const handleAdd = (0, $grpOf$react.useCallback)(()=>{
        dispatch({
            type: "add",
            id: id,
            connectWith: connectWith,
            element: nodeRef.current
        });
    }, [
        connectWith,
        dispatch,
        id
    ]);
    const clone = (0, $grpOf$react.useMemo)(()=>{
        const { props: childProps  } = children;
        return /*#__PURE__*/ (0, $grpOf$react.cloneElement)(children, {
            ...childProps,
            ref: (node)=>{
                nodeRef.current = node;
                if (typeof children === "function") childProps.ref(node);
            }
        });
    }, [
        children
    ]);
    (0, $grpOf$react.useEffect)(()=>{
        handleAdd();
    }, [
        props,
        handleAdd,
        nodeRef
    ]);
    (0, $grpOf$react.useEffect)(()=>{
        return ()=>{
            dispatch({
                type: "remove",
                id: id
            });
        };
    }, [
        dispatch,
        id
    ]);
    return clone;
}







const $98a2f3b0e2a8959c$export$def641b22e0a4283 = (props)=>{
    const { paths: paths , edge: edge  } = props;
    const path = `M ${paths.map((p, index)=>{
        if (index === 1 && edge === "step") return `${p.x} ${p.y}`;
        if (index === 1 && edge === "bezier") return `C ${p.x} ${p.y}`;
        return `${p.x} ${p.y}`;
    }).join(" ")}`;
    return path;
};


function $aa24e912bffab2b3$export$d16800b7e59a8051(el) {
    if (!el.element) return document.querySelector(`#${el.id}`);
    return el.element;
}


const $bbea1a3918e0f76d$var$EMPTY_ARRAY = [];
function $bbea1a3918e0f76d$export$790ca4df398846a2(props) {
    const { elements: elements  } = props;
    // const connections = elements?.map((e) => e.connectWith?.map((x) => x?.id)).flat()
    const grouped = elements.filter((e)=>(e?.connectWith || $bbea1a3918e0f76d$var$EMPTY_ARRAY).length > 0).map((el)=>{
        const { connectWith: connectWith  } = el;
        // const connectionsLen = connections.filter((y) => y === el.id)?.length || 0
        const connectEls = elements.filter((c)=>connectWith?.map((a)=>a.id).includes(c.id)).map((x)=>{
            return {
                rect: (0, $aa24e912bffab2b3$export$d16800b7e59a8051)(x)?.getBoundingClientRect(),
                color: connectWith?.find((a)=>a.id === x.id)?.color || "magenta",
                edge: connectWith?.find((a)=>a.id === x.id)?.edge || "bezier",
                stroke: connectWith?.find((a)=>a.id === x.id)?.stroke || "solid"
            };
        });
        if (connectEls.length === 0) return;
        return {
            from: {
                rect: (0, $aa24e912bffab2b3$export$d16800b7e59a8051)(el)?.getBoundingClientRect()
            },
            to: connectEls
        };
    }).filter(Boolean);
    return grouped;
}


const $db9ef6aef4516908$var$LINE_OFFSET = 9;
const $db9ef6aef4516908$var$POS_OFFSET = 40;
function $db9ef6aef4516908$var$getPosition(props) {
    const { from: from , to: to  } = props;
    const allowYConnect = from.left - $db9ef6aef4516908$var$POS_OFFSET < to.right && from.right + to.width > to.right - $db9ef6aef4516908$var$POS_OFFSET;
    const bottomToTop = from.bottom < to.top && allowYConnect;
    const topToBottom = from.top > to.bottom && allowYConnect;
    const rightToLeft = from.left > to.right;
    const leftToRight = from.right < to.left;
    if (bottomToTop) return "bottom-to-top";
    if (topToBottom) return "top-to-bottom";
    if (rightToLeft) return "right-to-left";
    if (leftToRight) return "left-to-right";
}
function $db9ef6aef4516908$export$7709b8005774fb51(props) {
    const { from: from , to: to  } = props;
    const fromRect = from?.rect;
    const toRect = to?.rect;
    if (!fromRect || !toRect) return;
    const position = $db9ef6aef4516908$var$getPosition({
        from: fromRect,
        to: toRect
    });
    switch(position){
        case "bottom-to-top":
            return [
                {
                    x: fromRect?.left + fromRect.width / 2,
                    y: fromRect?.bottom
                },
                {
                    x: fromRect?.left + fromRect.width / 2,
                    y: fromRect.bottom - (fromRect.bottom - toRect.top) / 2
                },
                {
                    x: toRect?.left + toRect.width / 2,
                    y: fromRect.bottom - (fromRect.bottom - toRect.top) / 2
                },
                {
                    x: toRect?.left + toRect.width / 2,
                    y: toRect.top - $db9ef6aef4516908$var$LINE_OFFSET
                }, 
            ];
        case "top-to-bottom":
            return [
                {
                    x: fromRect?.left + fromRect.width / 2,
                    y: fromRect?.top
                },
                {
                    x: fromRect?.left + fromRect.width / 2,
                    y: fromRect.top - (fromRect.top - toRect.bottom) / 2
                },
                {
                    x: toRect?.left + toRect.width / 2,
                    y: fromRect.top - (fromRect.top - toRect.bottom) / 2
                },
                {
                    x: toRect?.left + toRect.width / 2,
                    y: toRect.bottom + $db9ef6aef4516908$var$LINE_OFFSET
                }, 
            ];
        case "right-to-left":
            return [
                {
                    x: fromRect?.left,
                    y: fromRect?.bottom - fromRect.height / 2
                },
                {
                    x: (toRect.right + fromRect.left) / 2,
                    y: fromRect?.bottom - fromRect.height / 2
                },
                {
                    x: (toRect.right + fromRect.left) / 2,
                    y: toRect.top + toRect.height / 2
                },
                {
                    x: toRect.right + $db9ef6aef4516908$var$LINE_OFFSET,
                    y: toRect.top + toRect.height / 2
                }, 
            ];
        case "left-to-right":
            return [
                {
                    x: fromRect?.right,
                    y: fromRect?.bottom - fromRect.height / 2
                },
                {
                    x: (toRect.left + fromRect.right) / 2,
                    y: fromRect?.bottom - fromRect.height / 2
                },
                {
                    x: (toRect.left + fromRect.right) / 2,
                    y: toRect.top + toRect.height / 2
                },
                {
                    x: toRect.left - $db9ef6aef4516908$var$LINE_OFFSET,
                    y: toRect.top + toRect.height / 2
                }, 
            ];
        default:
            return [];
    }
}





const $5adf053b231d65df$var$SVG_STYLE = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    pointerEvents: "none",
    width: "100%",
    height: "100%"
};
const $5adf053b231d65df$var$DEFAULT_COLOR = "magenta";
const $5adf053b231d65df$var$EMPTY_ARRAY = [];
function $5adf053b231d65df$export$775ba819c8141467(props) {
    const [pointsData, setPointsData] = (0, $grpOf$react.useState)($5adf053b231d65df$var$EMPTY_ARRAY);
    const [isInteracting, setIsInteracting] = (0, $grpOf$react.useState)(false);
    const { elements: elements  } = props;
    const raf = (0, $grpOf$react.useRef)();
    /**
   * Create array of all colors configured.
   * These colors is used to render the svg markers (e.g arrows).
   */ const colors = (0, $grpOf$react.useMemo)(()=>[
            ...new Set([
                ...elements.map((e)=>e.connectWith?.map((c)=>c?.color)).flat(),
                $5adf053b231d65df$var$DEFAULT_COLOR, 
            ]), 
        ].filter(Boolean), [
        elements
    ]);
    const handleCalcLines = (0, $grpOf$react.useCallback)(()=>{
        if (raf.current) window.cancelAnimationFrame(raf.current);
        raf.current = window.requestAnimationFrame(()=>{
            /**
       * The `getGroupedConnections` function returns:
       *
       *  {
       *    from: DOMRect,
       *    to: {
       *       rect: DOMRect,
       *       color: string,
       *       edge: string,
       *       stroke: string
       *    }[]
       *  }
       */ const groupedConnections = (0, $bbea1a3918e0f76d$export$790ca4df398846a2)({
                elements: elements
            });
            const points = groupedConnections.map((data)=>{
                const { from: from , to: toArray  } = data || {};
                const pathDataArr = toArray?.map((to)=>{
                    /**
             * The `getPathData` function returns an array of objects with
             * x and y coordinates for the line.
             */ const pathData = (0, $db9ef6aef4516908$export$7709b8005774fb51)({
                        from: from,
                        to: to
                    });
                    if (!pathData) return;
                    /**
             * The `pathify` functions returns a svg-readable string of the coordinates
             */ const path = (0, $98a2f3b0e2a8959c$export$def641b22e0a4283)({
                        paths: pathData,
                        edge: to?.edge
                    });
                    /**
             * Dummy validation of the path
             */ if (!/\d/.test(path)) return;
                    /**
             * Return the path (d) together with other relevant data such as color, stroke, edge.
             */ return {
                        d: path,
                        ...to
                    };
                });
                return pathDataArr;
            }).filter(Boolean).flat();
            const data1 = points.filter((p)=>Boolean(p));
            setPointsData(data1);
        });
    }, [
        elements
    ]);
    /**
   * Handle drag and drop gestures and update the paths
   */ const handleStartInteracting = (0, $grpOf$react.useCallback)(()=>{
        setIsInteracting(true);
    }, []);
    const handleStopInteracting = (0, $grpOf$react.useCallback)(()=>{
        setIsInteracting(false);
    }, []);
    const handleUpdateLines = (0, $grpOf$react.useCallback)(()=>{
        if (isInteracting) handleCalcLines();
    }, [
        handleCalcLines,
        isInteracting
    ]);
    (0, $grpOf$react.useEffect)(()=>{
        handleCalcLines();
    }, [
        handleCalcLines
    ]);
    (0, $grpOf$react.useEffect)(()=>{
        window.addEventListener("resize", handleCalcLines, {
            passive: true
        });
        window.addEventListener("scroll", handleCalcLines, {
            passive: true
        });
        return ()=>{
            window.removeEventListener("resize", handleCalcLines);
            window.removeEventListener("scroll", handleCalcLines);
        };
    }, [
        handleCalcLines
    ]);
    const ro = (0, $grpOf$react.useMemo)(()=>new ResizeObserver(handleCalcLines), [
        handleCalcLines
    ]);
    (0, $grpOf$react.useEffect)(()=>{
        elements.forEach((el)=>{
            const element = (0, $aa24e912bffab2b3$export$d16800b7e59a8051)(el);
            element?.addEventListener("mousedown", handleStartInteracting, {
                passive: true
            });
            element?.addEventListener("mouseup", handleStopInteracting, {
                passive: true
            });
            element?.addEventListener("mousemove", handleUpdateLines, {
                passive: true
            });
            element?.addEventListener("touchstart", handleStartInteracting, {
                passive: true
            });
            element?.addEventListener("touchend", handleStopInteracting, {
                passive: true
            });
            element?.addEventListener("touchmove", handleUpdateLines, {
                passive: true
            });
            if (element) ro.observe(element);
        });
        return ()=>{
            elements.forEach((el)=>{
                const element = (0, $aa24e912bffab2b3$export$d16800b7e59a8051)(el);
                element?.removeEventListener("mousedown", handleStartInteracting);
                element?.removeEventListener("mouseup", handleStopInteracting);
                element?.removeEventListener("mousemove", handleUpdateLines);
                element?.removeEventListener("touchstart", handleStartInteracting);
                element?.removeEventListener("touchend", handleStopInteracting);
                element?.removeEventListener("touchmove", handleUpdateLines);
                if (element) {
                    ro.disconnect();
                    ro.unobserve(element);
                }
            });
        };
    }, [
        elements,
        handleCalcLines,
        handleStartInteracting,
        handleStopInteracting,
        handleUpdateLines,
        ro, 
    ]);
    return (0, $grpOf$react.useMemo)(()=>/*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsxs)("svg", {
            style: $5adf053b231d65df$var$SVG_STYLE,
            children: [
                colors?.map((c)=>/*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)("defs", {
                        children: /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)("marker", {
                            id: `triangle-${c}`,
                            markerHeight: "5",
                            markerUnits: "strokeWidth",
                            markerWidth: "5",
                            orient: "auto",
                            refX: "1",
                            refY: "5",
                            viewBox: "0 0 10 10",
                            children: /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)("path", {
                                d: "M 0 0 L 10 5 L 0 10 z",
                                fill: c
                            })
                        })
                    }, c)),
                pointsData?.map((p)=>{
                    return /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)("path", {
                        id: "p1",
                        d: p?.d,
                        fill: "none",
                        markerEnd: `url(#triangle-${p?.color})`,
                        stroke: p?.color,
                        strokeWidth: "2",
                        strokeDasharray: p?.stroke === "dashed" ? 4 : 0,
                        strokeLinejoin: "round"
                    }, p?.d);
                })
            ]
        }), [
        colors,
        pointsData
    ]);
}




function $0295f77677accdeb$var$ConnectProviderInner() {
    const { elements: elements  } = (0, $0b003004ebdafb37$export$fc84c22acd302ca7)();
    return /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)((0, $5adf053b231d65df$export$775ba819c8141467), {
        elements: elements
    });
}
function $0295f77677accdeb$export$230737e70939b618(props) {
    const { children: children  } = props;
    return /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsxs)((0, $ae672f8a57332157$export$5c92df8ce16beba9), {
        children: [
            children,
            /*#__PURE__*/ (0, $grpOf$reactjsxruntime.jsx)($0295f77677accdeb$var$ConnectProviderInner, {})
        ]
    });
}





//# sourceMappingURL=index.js.map
