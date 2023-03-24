#include <bits/stdc++.h>
using namespace std;
// 在本地編譯時可以用 -D DEBUG 關掉fastio幫助debug
const int S = 80000000;
char inbuf[S];int inp=0;
inline char readchar(){
#ifndef DEBUG
    return inbuf[inp++];
#else
    return getchar();
#endif
}
inline void R(int &a){
	static char c;
	while(((c = readchar()) < '0' or c > '9') and c != '-' and c != EOF);
	if(c == '-'){
		a = 0;
		while((c = readchar()) >= '0' and c <= '9') a *= 10, a -= c ^ '0';
	} else {
		a = c ^ '0';
		while((c = readchar()) >= '0' and c <= '9') a *= 10, a += c ^ '0';
	}
}
char outbuf[S]; int outp=0;
inline void puting(char c){
    outbuf[outp++] = c;
}
int main() {
#ifndef DEBUG
    fread(inbuf, 1, S, stdin);
#endif
    int n;
    R(n);
    int z;
    while(n--) {
        // 可能要初始化什麼
        for (int i = 1;i<=5;i++)for (int j = 1;j<=7;j++){
            z = readchar()-'0';
            // 把z存起來
            readchar();
        }
        // 運算
        for (int i = 1;i<=5;i++)for (int j = 1;j<=7;j++){
            puting(
            // 你要輸出的東西，如果是int記得+'0'
            ),puting(j==7?'\n':' ');
        }
    }
	fwrite(outbuf, 1, outp, stdout);
}