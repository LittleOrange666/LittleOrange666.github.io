var main = $("#main_area");
var actdict = {};

function initindex() {
    if (main.find("h1,h2,h3,h4,h5,h6,p,pre,ol,ul").first().prop("tagName") != "H1") {
        main.prepend($("<h1></h1>").text($("title").text()));
    }
    main.find("h1,h2,h3,h4,h5,h6,p,pre,ol,ul").addClass("a_content");
    main.find("h1,h2,h3").addClass("a_header");
    let header = "";
    $(".a_content").each(function() {
        if ($(this).hasClass("a_header")) {
            header = $(this).text();
            $(this).attr("id", header);
        } else {
            $(this).attr("connectedheader", header)
        }
    });
    let index = $("#indexbar");
    let createul = () => $('<ul class="nav"></ul>');
    let createli = (name) => $('<li><a href="#' + name + '" title="' + name + '" smoothhashscroll>' + name + '</a></li>');
    let p0 = createul();
    index.append(p0);
    let p1 = p0;
    let p2 = p0;
    let l1 = null;
    let l2 = null;
    $(".a_header").each(function() {
        let name = $(this).text()
        let l = createli(name);
        switch ($(this).prop("tagName")) {
            case "H1":
                p0.append(l);
                p1 = createul();
                p2 = p1;
                l2 = l1 = l;
                l.append(p1);
                actdict[name] = [l];
                break;
            case "H2":
                p1.append(l);
                p2 = createul();
                l.append(p2);
                l2 = l;
                actdict[name] = [l, l1];
                break;
            case "H3":
                p2.append(l);
                actdict[name] = [l, l1, l2];
                break;
        }
    });
}

function update_inview() {
    $(".a_header_targeted").removeClass("a_header_targeted");
    let o = $(".a_content_inview:first");
    let target = o.attr("connectedheader");
    if (o.hasClass("a_header")) target = o.attr("id");
    if (target) $("#" + target).addClass("a_header_targeted");
    $(".activated").removeClass("activated");
    $(".a_header_targeted").each(function() {
        for (let o of actdict[$(this).text()]) {
            o.addClass("activated");
        }
    });
}
//table style
main.find("table").addClass("table").addClass("table-striped").addClass("table-bordered");
//init index
initindex();
//init view detect
inView(".a_content").on('enter', e => {
        e.classList.add("a_content_inview");
        update_inview();
    })
    .on('exit', e => {
        e.classList.remove("a_content_inview");
        update_inview();
    });
update_inview();
//previous btn action
$("#previous").click(() => {
    if (location.href.endsWith("/")) {
        location.href = "../";
    } else {
        location.href = "./";
    }
});