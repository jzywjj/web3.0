/**
 * Created by lenovo on 2015-11-03.
 */

(function($){
    //treegrid-dnd事件

    $.extend($.fn.treegrid.defaults, {
        onBeforeDrag: function(row){},	// return false to deny drag
        onStartDrag: function(row){},
        onStopDrag: function(row){},
        onDragEnter: function(targetRow, sourceRow){},	// return false to deny drop
        onDragOver: function(targetRow, sourceRow){},	// return false to deny drop
        onDragLeave: function(targetRow, sourceRow){},
        onBeforeDrop: function(targetRow, sourceRow, point){},
        onDrop: function(targetRow, sourceRow, point){}	// point:'append','top','bottom'
    });
    //treegrid-dnd方法
    $.extend($.fn.treegrid.methods, {
        enableDnd: function(jq, id){ //jq是调用的方法，id是被拖放行的id

            if (!$('#treegrid-dnd-style').length){
                //在head里加红边框的style
                $('head').append(
                    '<style id="treegrid-dnd-style">' +
                    '.treegrid-row-top td{border-top:1px solid red}' +
                    '.treegrid-row-bottom td{border-bottom:1px solid red}' +
                    '.treegrid-row-append .tree-title{border:1px solid red}' +
                    '</style>'
                );
            }
            //遍历jq方法的对象，为每个匹配元素function()   循环该方法下的每一个function
            return jq.each(function(){
                var target = this;//当前treegrid
                var state = $.data(this, 'treegrid');//treegrid的数据
                state.disabledNodes = [];//初始化treegrid的禁用节点
                var t = $(this);//当前元素的jquery对象
                var opts = state.options;//返回treegrid的数据的属性对象
                //var src = $(document.getElementById("tabtest1"));
                //var tag = $(document.getElementById("tabtest2"));

                if (id){ //如果被拖放的数据存在id
                    var nodes = opts.finder.getTr(target, id);//依据当前拖拽行的Id获得这棵treegrid的tr(获得的仅是这一行，不包括它的子节点)
                    var rows = t.treegrid('getChildren', id);//依据当前拖拽行的Id获得该Id下的所有子节点
                    //得到当前拖拽行以及其子节点的数据
                    for(var i=0; i<rows.length; i++){
                        nodes = nodes.add(opts.finder.getTr(target, rows[i][opts.idField]));//依据第i个子节点的id获得treegrid的tr，并加入到它的父节点tr上
                    }
                } else {//如果被拖拽的数据没有id
                    var nodes = t.treegrid('getPanel').find('tr[node-id]');//得到该树所在的面板，并得到该面板内所有拥有node-id属性的tr。
                }
                nodes.draggable({//定义整棵treegrid的拖拽属性
                    disabled:false,//设置为可拖动
                    revert:true,//在拖动停止时元素将返回起始位置。
                    cursor:'pointer',
                    proxy: function(source){//增加一个拖动的虚拟样式
                        var row = t.treegrid('find', $(source).attr('node-id'));
                        var p = $('<div class="tree-node-proxy"></div>').appendTo('body');
                        p.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>'+row[opts.treeField]);
                        p.hide();
                        return p;
                    },
                    deltaX: 15,
                    deltaY: 15,
                    onBeforeDrag:function(e){//在拖动之前触发，返回false将取消拖动。
                    	//以下情况取消拖动
                        var src = $($(this).closest('.datagrid-view')).children('table');
                        try {
                            if (opts.onBeforeDrag.call(target, getRow(this, src)) == false) {
                                return false
                            }
                            if ($(e.target).hasClass('tree-hit') || $(e.target).parent().hasClass('datagrid-cell-check')) {
                                return false;
                            }
                            if (e.which != 1) {
                                return false;
                            }
                            //设置紧随着当前拖拽行的class=treegrid-tr-tree的tr元素的拥有node-id属性的后代tr为不可接受
                            //也就是设置当前拖动行的任何后代节点都为不接受放置
                            //也许就是将这些节点设置为禁用节点
                            $(this).next('tr.treegrid-tr-tree').find('tr[node-id]').droppable({accept: 'no-accept'});
//						var tr = opts.finder.getTr(target, $(this).attr('node-id'));
//						var treeTitle = tr.find('span.tree-title');
//						e.data.startX = treeTitle.offset().left;
//						e.data.startY = treeTitle.offset().top;
//						e.data.offsetWidth = 0;
//						e.data.offsetHeight = 0;
                        }
                        catch(err )
                        {
                            alert(err.message);
                        }
                    },
                    onStartDrag:function(){//在开始拖动行的时候触发
                        $(this).draggable('proxy').css({
                            left:-10000,
                            top:-10000
                        });
                        var src = $($(this).closest('.datagrid-view')).children('table');
                        var row = getRow(this,src);//获取当前行的后代元素
                        opts.onStartDrag.call(target, row);//令当前拖拽行的后代也执行onStartDrag方法
                        state.draggingNodeId = row[opts.idField];//后的当前拖拽行的所有后代的Id
                    },
                    onDrag:function(e){//看起来都是设置样式的，先忽略
                        var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
                        var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                        if (d>3){	// when drag a little distance, show the proxy object
                            $(this).draggable('proxy').show();
                            var tr = opts.finder.getTr(target, $(this).attr('node-id'));//得到当前拖拽行内拥有node-id属性的这棵treegrid里的tr
                            var treeTitle = tr.find('span.tree-title');
                            e.data.startX = treeTitle.offset().left;
                            e.data.startY = treeTitle.offset().top;
                            e.data.offsetWidth = 0;
                            e.data.offsetHeight = 0;
                        }
                        this.pageY = e.pageY;
                    },
                    onStopDrag:function(){//在停止拖动行的时候触发
                    	//设置目标行的下一class为treegrid-tr-tree同级tr的所有拥有node-id属性后代tr将接受拥有node-id属性的tr
                        //设置目标行的后代tr可以接受拥有node-id属性的tr
                        $(this).next('tr.treegrid-tr-tree').find('tr[node-id]').droppable({accept:'tr[node-id]'});
                        //启用之前禁用了的节点（也就是拖拽行的子节点）的放置功能
                        for(var i=0; i<state.disabledNodes.length; i++){
                            var tr = opts.finder.getTr(target, state.disabledNodes[i]);//获得treegrid的所有禁用节点
                            tr.droppable('enable');//启用这些节点的放置功能
                        }
                        state.disabledNodes = [];//重新初始化禁用节点（为下次存储新的拖拽行放置其子节点做准备）
                        var row = t.treegrid('find', state.draggingNodeId);//通过正在拖拽的节点的id查找这些节点并返回节点后代。
                        opts.onStopDrag.call(target, row);//让当前拖拽节点的后代节点也执行onStopDrag方法
                    }
                }).droppable({//设置可拖拽元素的放置属性
                    accept:'tr[node-id]',//接受拥有node-id属性的tr
                    onDragEnter: function(e, source){//在被拖拽元素到放置区内的时候触发,source参数表示被拖拽的DOM元素 targetRow, sourceRow
                        var src = $($(source).closest('.datagrid-view')).children('table');
                        var tag = $($(this).closest('.datagrid-view')).children('table');
                        if (opts.onDragEnter.call(target, getRow(this,tag), getRow(source,src)) == false){//如果目标行和被拖拽原始行的后代元素没有成功执行onDragEnter方法
                            allowDrop(source, false);//将原始拖拽行设置为不可接受放置的图标
                            var tr = opts.finder.getTr(target, $(this).attr('node-id'));//得到当前目标行内拥有node-id属性的这棵treegrid里的tr
                            tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的展开属性、上空间、下空间
                            tr.droppable('disable');//禁用tr的放置功能
                            state.disabledNodes.push($(this).attr('node-id'));//将当目标行拥有node-id属性的节点Id列入禁用节点中
                        }
                    },
                    onDragOver:function(e,source){//在行悬停在目标行内时触发 targetRow, sourceRow
                        var nodeId = $(this).attr('node-id');//获取目标行拥有node-id属性的节点Id
                        //在数组中查找指定值并返回它的索引（如果没有找到，则返回-1）jQuery.inArray( value, array [, fromIndex ] )
                        //value 类型: Anything 要查找的值 nodeId。 array 类型: Array 一个数组，通过它来查找 state.disabledNodes。
                        if ($.inArray(nodeId, state.disabledNodes) >= 0){return}//如果该节点属于禁用节点，则返回。
                        //该节点不属于禁用节点
                        var pageY = source.pageY;//获取被拖拽原始行相对于文档的顶部边缘的位置（坐标）
                        var top = $(this).offset().top;
                        var bottom = top + $(this).outerHeight();
                        allowDrop(source, true);//将被拖拽原始行的图标设置为可以接受放置的图标。
                        var tr = opts.finder.getTr(target, nodeId);//得到id为nodeId的这棵treegrid里的tr
                        tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的展开属性、上空间、下空间
                        if (pageY > top + (bottom - top) / 2){
                            if (bottom - pageY < 5){
                                tr.addClass('treegrid-row-bottom');//增加该tr下空间
                            } else {
                                tr.addClass('treegrid-row-append');//增加该tr展开属性
                            }
                        } else {
                            if (pageY - top < 5){
                                tr.addClass('treegrid-row-top');//增加该tr上空间
                            } else {
                                tr.addClass('treegrid-row-append');//增加该tr展开属性
                            }
                        }
                        var src = $($(source).closest('.datagrid-view')).children('table');
                        var tag = $($(this).closest('.datagrid-view')).children('table');
                        if (opts.onDragOver.call(target, getRow(this,tag), getRow(source,src)) == false){//如果当前目标行和被拖拽原始行的后代元素没有成功执行onDragOver方法
                            allowDrop(source, false);//将被拖拽原始行设置为不可接受放置的图标
                            tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的展开属性、上空间、下空间
                            tr.droppable('disable');//禁用tr的放置功能
                            state.disabledNodes.push(nodeId);//将目标行列入禁用节点中
                        }
                    },
                    onDragLeave:function(e,source){//在拖动一个节点离开某个目标节点时触发 targetRow, sourceRow
                        allowDrop(source, false);//将被拖拽原始行设置为不可接受放置的图标
                        var tr = opts.finder.getTr(target, $(this).attr('node-id'));//获得id为拥有node-id属性的节点Id的当前目标行的tr
                        tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的展开属性、上空间、下空间
                        var src = $($(source).closest('.datagrid-view')).children('table');
                        var tag = $($(this).closest('.datagrid-view')).children('table');
                        opts.onDragLeave.call(target, getRow(this,tag), getRow(source,src));//令当前目标行和被拖拽的原始行的后代元素执行onDragLeave方法
                    },
                    onDrop:function(e,source){//在行被释放的时候触发 targetRow, sourceRow

                        var dest = this;
                        var action, point;
                        var tr = opts.finder.getTr(target, $(this).attr('node-id'));//得到当前目标行内拥有node-id属性的这棵treegrid里的tr
                        if (tr.hasClass('treegrid-row-append')){//如果该行被添加上可展开标签
                            action = append;//action为下面的append函数：将原始拖拽行加入父节点当前目标行中
                            point = 'append';
                        } else {//如果该行被添加合上标签
                            action = insert;//action为下面的insert函数：在当前目标行节点上/下插入原始拖拽节点
                            point = tr.hasClass('treegrid-row-top') ? 'top' : 'bottom';
                        }

                        var src = $($(source).closest('.datagrid-view')).children('table');
                        var tag = $($(this).closest('.datagrid-view')).children('table');
                        var dRow = getRow(this,tag);//当前目标行
                        var sRow = getRow(source,src);//原始拖拽行
                        if (opts.onBeforeDrop.call(target, dRow, sRow, point) == false){//在行被释放前触发，返回false拒绝释放。targetRow：要释放的目标行。sourceRow：被拖动的原始行。point： 指明拖放操作，可用值有：'top','bottom'。
                            tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的展开属性、上空间、下空间
                            return;
                        }
                        //目标行同意释放
                        action(sRow, dRow, point,$(src),$(tag));//将原始拖拽行加入目标行。sRow为拖拽行，dRow为目标行，point为top或bottom
                        tr.removeClass('treegrid-row-append treegrid-row-top treegrid-row-bottom');//去掉该tr的可展开属性、上空间、下空间
                    }
                });

                //为图标重新设置是否可接受放置的图标
                function allowDrop(source, allowed){
                    var icon = $(source).draggable('proxy').find('span.tree-dnd-icon');
                    icon.removeClass('tree-dnd-yes tree-dnd-no').addClass(allowed ? 'tree-dnd-yes' : 'tree-dnd-no');
                }
                //获得该tr的后代元素
                function getRow(tr,curgrid){
                    var nodeId = $(tr).attr('node-id');
                    t = curgrid;
                    return t.treegrid('find', nodeId);
                }
                //在行被释放时，将节点sRow追加到父节点dRow上，并展开节点dRow
                function append(sRow, dRow,point,src,tag){
                    doAppend();
                    if (dRow.state == 'closed'){
                        tag.treegrid('expand', dRow[opts.idField]);
                    }
                    function doAppend(){
                    	var data = t.treegrid('pop', sRow[opts.idField]);//获取拥有opts.idField属性的sRow数据以及它的子节点   原来的删除  使用改行代码效果为“剪切”
                        //var data = src.treegrid('find', sRow[opts.idField]);//获取拥有opts.idField属性的sRow数据以及它的子节点 使用改行代码效果为“复制”
                        //追加t节点到拥有opts.idField属性的父节点dRow上
                        tag.treegrid('append', {
                            parent: dRow[opts.idField],//父节点
                            data: [data]//数组，节点数据
                        });
                        opts.onDrop.call(target, dRow, data, 'append');//行释放的时候调用
                    }
                }
                //在行被释放时，将节点sRow插入到节点dRow之前/之后
                function insert(sRow, dRow, point,src,tag){
                   var param = {};
                   if (point == 'top'){//如果光标在上
                        param.before = dRow[opts.idField];//插入拥有属性opts.idField的dRow之前
                   } else {//如果光标在下
                        param.after = dRow[opts.idField];//插入拥有属性opts.idField的dRow之后
                   }

                   var data = t.treegrid('pop', sRow[opts.idField]);//获取拥有opts.idField属性的sRow数据以及它的子节点    原来的删除 使用改行代码效果为“剪切”
                   //var data = src.treegrid('find', sRow[opts.idField]);//获取拥有opts.idField属性的sRow数据以及它的子节点  使用改行代码效果为“复制”
                   param.data = data;
                   tag .treegrid('insert', param);//将sRow节点到dRow的之前或之后
                   opts.onDrop.call(target, dRow, data, point);//执行onDrop方法
                }
            });
        }
    });
})(jQuery);
