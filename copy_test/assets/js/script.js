   $(document).ready(function(){

    var isChecked; 
    var myId;

        

        $("input:checkbox").change(function() { 
            
          

            if($(this).prop("checked") == true){
                isChecked=true;
            }
            else if($(this).prop("checked") == false){
                isChecked=false;
            }

            $.ajax({
                        url: '/todo/update/'+$(this).attr('id'),
                        type: 'POST',
                        data: { Completed:isChecked },
                        failure: function(msg) {
                        alert("Fail : " + msg);
                        },
                  });        
        }); 

      /** $("#add").on('keyup keypress',function(e) { 
                var keycode= e.keyCode|| e.which;
                val="saravanana is going to sleep";
                myId=$(this).attr('customer-id');
                    $.ajax({
                        url: '/todo/create',
                        type: 'POST',
                        data: { 
                            content:val,
                            customer_id:myId },


                        success: function(){
                            url: '/todo/new'
                        }
                        failure: function(msg) {
                        alert("Fail : " + msg);
                        },
                  });  
            });*/ 
               
    });