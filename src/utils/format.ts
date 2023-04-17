// 对特殊字符进行转义
export function escapeSpecialCharacter(str: string): string {
	const pattern =
		/[`~!@#_$%^&*()=|{}':;',\\\[\\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\s]/g;
	return str.replace(pattern, match => '\\' + match);
}
