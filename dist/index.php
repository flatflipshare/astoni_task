<?php
    $prototypeLink="https://www.figma.com/file/TO7JfO39gafxdkwwmmUSMY/Templates-%236.-More-on-Figma.info-(Copy)?type=design&node-id=2-2&t=9N6o2h3LrvvBmQYD-0";
    $projectName = "Astoni task"
?>

<?php /* ============================================================ */ ?>
<?php /* ================ BLANK PAGE DON'T EDIT THIS ================ */ ?>
<?php /* ============================================================ */ ?>


<!DOCTYPE html>
<meta charset="utf-8" />
<style>
    body {
        padding: 50px 0 200px 0;
    }
    h1 { font-family:Arial,sans-serif; }
    h3 { padding: 0; margin: 0; font-family:Arial,sans-serif; }
    .table-parent { width: 800px; margin: 0 auto; }
    .table { width: 100%; table-layout: fixed; }
    .table td { border: 1px solid #ccc; border-collapse: collapse; text-align: left; }
    .link-parent { margin: 0 0 10px 0; }
    .link { padding: 10px 10px 10px 20px; position:relative;display: block;font-family:Arial,sans-serif; font-size:16px; color: #000; text-decoration: none; }
    .link:hover { text-decoration: underline; }
    .link-preview {
        display:none;
        position:absolute;
        overflow:hidden;
        top:50%;
        right:100%;
        margin:-200px 0 0 0;
        width:255px;
        height:400px;
        padding:10px;
        background:#ddd;
        transition: transform .2s, opacity .2s, visibility .2s;
    }
    .link:hover .link-preview {
        display: block;
    }
</style>
<div style="padding:30px;text-align:center;">
    <h1>«<?php echo $projectName ?>»</h1>
    <?php $files = scandir($_SERVER["DOCUMENT_ROOT"] . '/dist/'); ?>
    <div class="table-parent">
        <table cellpadding="0" cellspacing="1" class="table">
            <tr>
                <td style="padding: 10px 10px 10px 20px;">
                    <h3>
                        Ссылка
                    </h3>
                </td>
            </tr>

            <tr>
                <td>
                    <a class="link" target="_blank" href="<?php echo $prototypeLink?>">
                        0. <?php echo $prototypeLink ?>
                    </a>
                </td>
            </tr>

            <?php $c=1;?>

            <?php foreach($files as $key=>$value): ?>
                <?php
                    // . && ..
                    if($key<2) { continue; }

                    // this page
                    if($value=="index.php") { continue; }

                    // dirs
                    if(strrpos($value,'.')<5) { continue; }
                ?>

                <tr>
                    <td>
                        <a class="link" target="_blank" href="/dist/<?=$value?>">
                            <?php echo $c?>. <?php echo $value?>
                            <div class="link-preview">
                                <iframe style="background:#fff;border:0;width:1280px;height:2000px;transform:scale(.2);transform-origin:0 0;" src="/dist/<?php echo $value?>"></iframe>
                            </div>
                        </a>
                    </td>
                </tr>
                <?php $c++;?>
            <?php endforeach; ?>
        </table>
    </div>
</div>




