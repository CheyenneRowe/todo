;(function(){
	"use strict";

	var $form_add_task = $(".add-task");
	var newTask={};//新增的一条事项
	
	$form_add_task.on("submit",function(event){
		event.preventDefault();
		//获得当前输入
		newTask = getInputData();
		if(!newTask.content) return;
		//将新事项添加进数组中，并保存在localStorage
		save();
		//待办项列表渲染
		renderNew();
	})

	//得到输入的数据
	function getInputData(){
		var $input = $form_add_task.find("input[type=text]");
		if($input.val()=="") return null;
		newTask.content = $input.val();
		//清空输入框
		$input.val("").focus();
		return newTask;
	}

	//存入localstorage中
	function save(){
		if(!newTask) return;
		//将数组存入localstorage中
		var taskList = store.get("taskList")||[];
		taskList.push(newTask);
		store.set("taskList",taskList);
	}

	function renderNew(){
		//给当前新项添加index
		var len= store.get("taskList").length;
		$(".task-item:eq(0)").clone()
		.css("display","block").attr("item-index",len)
		.appendTo("#task-list")
		.find(".task-content").text(newTask.content);
		bindDel();
	}

	function renderList(){
		var taskArr = store.get("taskList");
		if(!taskArr) return;
		for(let i = 0;i<taskArr.length;i++){
			$(".task-item:eq(0)").clone().css("display","block").attr("item-index",i)
			.appendTo("#task-list")
			.find(".task-content").text(taskArr[i].content);	
		}	
		bindDel();
	}

	function init(){
		renderList();
	}

	function removeUi(obj){
		$(obj).parent().remove();
		resetIndex();
	}
	function deleteData(index){
		var taskarr = store.get("taskList");
		taskarr.splice(index,1);
		store.set("taskList",taskarr);

	}
	//重新将列表的index赋值
	function resetIndex(){
		var count =$(".task-item:gt(0)").length;
		for(let i=0;i<count;i++){
			$($(".task-item:gt(0)").get(i)).attr("item-index",i);
		}
	}
	init();
	function bindDel(){
		$(".delBtn").on("click",function(){
		//获得当前点击的index
		var index= $(this).parent().attr("item-index");
		// 从界面删除
		removeUi(this);
		// 从localstorage中删除
		deleteData(index);
	})
}
	$(".check").on("click",function(){
		
		console.log($(this).is(":checked"));
	})
})();