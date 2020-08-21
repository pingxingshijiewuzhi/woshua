<template>
    <picker mode="multiSelector" 
            :value="multiIndex" 
            :range="multiArray" 
            @change="handleValueChange"
            @columnchange="handleColumnChange">
        <slot></slot>
    </picker>
</template>

<script>
    // const provinceArr = china_regions.map(item=>item.name)
	export default {
        props:{
            defaultRegions:{
                type:Array,
                default(){
                    return []
                }
            },
			china_regions:{
				type:Array,
				default(){
				    return []
				}
			}
        },
		data() {
			return {
                cityArr:[],
                // districtArr:[],
                multiIndex: [0, 0],
                isInitMultiArray:true,
			}
		},
        watch:{
            defaultRegions:{
                handler(arr,oldArr=[]){
                    // 避免传的是字面量的时候重复触发
                    // console.log(arr,oldArr);
                    if(arr.length!==2 || arr.join('')===oldArr.join('')) return;
                    // console.log('触发了');
                    this.handleDefaultRegions()
                },
                immediate:true,
            },
        },
        computed:{
            multiArray(){
                return this.pickedArr.map(arr=>arr.map(item=>item.name))
            },
            pickedArr(){
				var that = this
                // 进行初始化
                if(that.isInitMultiArray){
                    return [
                        that.china_regions,
                        that.china_regions[0].childs
                    ]
                }
                return [that.china_regions,that.cityArr];
            }
        },
		methods: {
            handleColumnChange(e){
                // console.log(e);
                this.isInitMultiArray = false;
                const that = this;
                let col = e.detail.column;
                let row = e.detail.value;
                that.multiIndex[col] = row;
                try{
                    switch(col){
                        case 0:
                            if(that.china_regions[that.multiIndex[0]].childs.length==0){
                                that.cityArr = that.districtArr = [that.china_regions[that.multiIndex[0]]]
                                break;
                            }
                            that.cityArr = that.china_regions[that.multiIndex[0]].childs
                            break;
                        case 1:
                            break;
                     
                    }
                }catch(e){
                    console.log(e);
                    // that.districtArr = that.china_regions[that.multiIndex[0]].childs[0].childs
                }
                
            },
            handleValueChange(e){
                // 结构赋值
                let [index0,index1] = e.detail.value;
                let [arr0,arr1] = this.pickedArr;
                let address = [arr0[index0],arr1[index1]];
                // console.log(address);
                this.$emit('getRegions',address)
            },
            handleDefaultRegions(){
                this.isInitMultiArray = false;
                let children = that.china_regions;
                for(let i = 0;i< this.defaultRegions.length;i++){
                    for(let j = 0;j<children.length;j++){
                        // 模糊匹配
                        if(children[j].name.includes(this.defaultRegions[i])){
                            // console.log(i,j,children.length-1);
                            children = children[j].childs;
                            if(i==0){
                                this.cityArr = children
                            }
                            this.$set(this.multiIndex,i,j)
                            // console.log(this.multiIndex);
                            break;
                        }else{
                            // 首次匹配失败就用默认的初始化
                            // console.log(i,j,children.length-1);
                            if(i==0 && j==(children.length-1)){
                                this.isInitMultiArray = true;
                            }
                        }
                    }
                }
            }
		},
	}
</script>
