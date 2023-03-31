#include "testlib.h"
#include<bits/stdc++.h>
using namespace std;
using ll = int;
#define getvar(str,out) if(varname.count(str)) out = varname[str];else{cerr << "unknow variable \"" << str << "\"\n";return 1;}
const ll CNT_LIMIT = 100000000;
int main(int argc, char* argv[]){
    registerInteraction(argc, argv);
    ll N = inf.readInt();
    ll n = ouf.readInt(1,100);
    vector<ll> ty(n),a(n),b(n),c(n);
    vector<pair<ll,ll>> st;
    map<string,ll> varname = {{"meow0",0},{"meow1",1},{"meow2",2},{"meow3",3},{"meow4",4},{"meow5",5},
    {"meow6",6},{"meow7",7},{"meow8",8},{"meow9",9}};
    map<string,ll> ops = {{"set",0},{"eq",1},{"if",2},{"endif",3},{"while",4},{"endwhile",5},{"add",6},
    {"sub",7},{"mul",8},{"div",9},{"mod",10},{"shiftleft",11},{"shiftright",12},{"and",13},{"xor",14},{"or",15},
    {"hanoi",16}};
    for(ll i = 0;i<n;i++){
        string s = ouf.readWord();
        if(!ops.count(s)){
            cerr << "unknow operator \"" << s << "\"\n";
            return 1;
        }
        ll t;
        ty[i] = t = ops[s];
        string var0,var1,var2;
        int i0,i1,i2,v;
        if (t == 0){
            var0 = ouf.readWord();
            v = ouf.readInt();
            getvar(var0,i0)
            a[i] = i0;
            b[i] = v;
        }else if (t == 1 || t == 16){
            var0 = ouf.readWord();
            var1 = ouf.readWord();
            getvar(var0,i0)
            getvar(var1,i1)
            a[i] = i0;
            b[i] = i1;
        }else if (t == 2 || t == 4){
            var0 = ouf.readWord();
            getvar(var0,i0)
            a[i] = i0;
            st.push_back({t==4,i});
        }else if (t == 3 || t == 5){
            if (st.empty()||st.back().first!=(t==5)){
                cerr << "code block not match\n";
                return 1;
            }
            a[i] = a[st.back().second];
            b[i] = st.back().second;
            b[st.back().second] = i;
            st.pop_back();
        }else{
            var0 = ouf.readWord();
            var1 = ouf.readWord();
            var2 = ouf.readWord();
            getvar(var0,i0)
            getvar(var1,i1)
            getvar(var2,i2)
            a[i] = i0;
            b[i] = i1;
            c[i] = i2;
        }
    }
    if (!st.empty()){
        cerr << "code block not match\n";
        return 1;
    }
    ll i = 0;
    ll cnt = 0;
    vector<ll> dat(10,0);
    dat[0] = N;
    while(i<n&&cnt<CNT_LIMIT){
        switch (ty[i]){
        case 0:
            dat[a[i]] = b[i];
            break;
        case 1:
            dat[a[i]] = dat[b[i]];
            break;
        case 2:
            if (!dat[a[i]]) i = b[i];
            break;
        case 3:
            cnt--;
            break;
        case 4:
            if (!dat[a[i]]) i = b[i];
            break;
        case 5:
            if (dat[a[i]]) i = b[i];
            break;
        case 6:
            dat[a[i]] = dat[b[i]] + dat[c[i]];
            break;
        case 7:
            dat[a[i]] = dat[b[i]] - dat[c[i]];
            break;
        case 8:
            dat[a[i]] = dat[b[i]] * dat[c[i]];
            break;
        case 9:
            dat[a[i]] = dat[b[i]] / dat[c[i]];
            break;
        case 10:
            dat[a[i]] = dat[b[i]] % dat[c[i]];
            break;
        case 11:
            dat[a[i]] = dat[b[i]] << dat[c[i]];
            break;
        case 12:
            dat[a[i]] = dat[b[i]] >> dat[c[i]];
            break;
        case 13:
            dat[a[i]] = dat[b[i]] & dat[c[i]];
            break;
        case 14:
            dat[a[i]] = dat[b[i]] ^ dat[c[i]];
            break;
        case 15:
            dat[a[i]] = dat[b[i]] | dat[c[i]];
            break;
        case 16:
            tout << dat[a[i]] << " " << dat[b[i]] << "\n";
            break;
        default:
            break;
        }
        i++;
        cnt++;
    }
    return 0;
}